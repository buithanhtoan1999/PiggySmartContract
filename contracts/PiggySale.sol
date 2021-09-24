// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "./RetrieveTokensFeature.sol";
import "./StagedCrowdsale.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";


contract PiggySale is StagedCrowdsale, RetrieveTokensFeature, ReentrancyGuard {

    using SafeMath for uint256;

    IERC20 public tokenSale;
    IERC20 public tokenPayment;

    uint256 public invested;
    uint256 public percentRate = 100;
    bool public isPause = false;
    address public ownerWallet;

    
    mapping(address => bool) public whitelist;

    mapping(uint256 => mapping(address => uint256)) public balances;

    event BuyToken(address indexed account, uint256 amount, uint256 price);

    mapping(uint256 => bool) public whitelistedMilestones;

    constructor(address _ownerWallet, address _tokenPayment, address _tokenSale) public {
        ownerWallet = _ownerWallet;
        tokenPayment = IERC20(_tokenPayment);
        tokenSale = IERC20(_tokenSale);
        
    }

    function setMilestoneWithWhitelist(uint256 index) public onlyOwner {
        whitelistedMilestones[index] = true;
    }

    function unsetMilestoneWithWhitelist(uint256 index) public onlyOwner {
        whitelistedMilestones[index] = false;
    }

    function addToWhiteList(address target) public onlyOwner {
        require(!whitelist[target], "Already in whitelist");
        whitelist[target] = true;
    }

    function addToWhiteListMultiple(address[] memory targets) public onlyOwner {
        for (uint i = 0; i < targets.length; i++) {
            if (!whitelist[targets[i]]) whitelist[targets[i]] = true;
        }
    }

    function pause() public onlyOwner {
        isPause = true;
    }

    function unpause() public onlyOwner {
        isPause = false;
    }

    function setTokenSale(address newTokenAddress) public onlyOwner() {
        tokenSale = IERC20(newTokenAddress);
    }

    function setOwnerWallet(address newOwnerWalletAddress) public onlyOwner() {
        ownerWallet = newOwnerWalletAddress;
    }

    function setTokenPayment(address newTokenAddress) public onlyOwner() {
        tokenPayment = IERC20(newTokenAddress);
    }

    function setPercentRate(uint256 newPercentRate) public onlyOwner() {
        percentRate = newPercentRate;
    }

    function updateInvested(uint256 value) internal {
        invested = invested.add(value);
    }

    function buyToken(uint256 amountBUSD, address referral) public nonReentrant returns (uint) {
        require(!isPause, "Contract paused");

        uint256 milestoneIndex = currentMilestone();
        Milestone storage milestone = milestones[milestoneIndex];

        // limit the minimum amount for one transaction 
        require(amountBUSD >= milestone.minInvestedLimit, "The amount is too small");

        // check if the milestone requires user to be whitelisted
        if (whitelistedMilestones[milestoneIndex]) {
            require(whitelist[_msgSender()], "The address must be whitelisted!");
        }

        // limit the maximum amount that one user can spend during the current milestone 
        uint256 maxAllowableValue = milestone.maxInvestedLimit - balances[milestoneIndex][_msgSender()];
        if (amountBUSD > maxAllowableValue) {
            amountBUSD = maxAllowableValue;
        }
        require(amountBUSD > 0, "Investment limit exceeded!");
        uint256 amountPiggy = amountBUSD.mul(10**18).div(milestone.price);
        tokenPayment.transferFrom(msg.sender, ownerWallet, amountBUSD);

        // update stats
        invested = invested.add(amountPiggy);
        milestone.tokensSold = milestone.tokensSold.add(amountPiggy);
        balances[milestoneIndex][_msgSender()] = balances[milestoneIndex][_msgSender()].add(amountBUSD);
        
        //we calculate the amount locked 
    
        uint256 amountLock = amountPiggy.mul(milestone.amountLock).div(percentRate);

        //amount transfer to user
        
        tokenSale.transferFrom(ownerWallet, msg.sender, amountPiggy.sub(amountLock));
        emit BuyToken(msg.sender, amountPiggy, milestone.price);
        // Calculate referral
        if(referral != address(0)){
            uint256 referralBonus = milestone.referralBonus;
            // apply a referral
            uint256 referralAmount = amountPiggy.mul(referralBonus).div(percentRate);
            tokenSale.transferFrom(ownerWallet, referral, referralAmount);
        }

        return amountPiggy;
    }


}

