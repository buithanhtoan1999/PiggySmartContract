// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/GSN/Context.sol";
import "@openzeppelin/contracts/math/SafeMath.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";


contract StagedCrowdsale is Context, Ownable {
    using SafeMath for uint256;
    using Address for address;

    struct Milestone {
        uint256 start;
        uint256 end;
        uint256 referralBonus;
        uint256 minInvestedLimit;
        uint256 maxInvestedLimit;
        uint256 tokensSold;
        uint256 hardcapInTokens;
        uint256 amountLock;
        uint256 price;
    }

    Milestone[] public milestones;

    function milestonesCount() public view returns (uint) {
        return milestones.length;
    }

    function addMilestone(uint256 start, uint256 end, uint256 referralBonus, uint256 minInvestedLimit, uint256 maxInvestedLimit, uint256 tokensSold, uint256 hardcapInTokens, uint256 amountLock, uint256 price) public onlyOwner {
        milestones.push(Milestone(start, end, referralBonus, minInvestedLimit, maxInvestedLimit, tokensSold, hardcapInTokens, amountLock, price));
    }

    function removeMilestone(uint8 number) public onlyOwner {
        require(number < milestones.length);
        //Milestone storage milestone = milestones[number];

        delete milestones[number];

        // check it
        for (uint i = number; i < milestones.length - 1; i++) {
            milestones[i] = milestones[i + 1];
        }

    }

    function changeMilestone(uint8 number, uint256 start, uint256 end, uint256 referralBonus, uint256 minInvestedLimit, uint256 maxInvestedLimit, uint256 tokensSold, uint256 hardcapInTokens, uint256 amountLock, uint256 price) public onlyOwner {
        require(number < milestones.length);
        Milestone storage milestone = milestones[number];

        milestone.start = start;
        milestone.end = end;
        milestone.referralBonus = referralBonus;
        milestone.minInvestedLimit = minInvestedLimit;
        milestone.maxInvestedLimit = maxInvestedLimit;
        milestone.tokensSold = tokensSold;
        milestone.hardcapInTokens = hardcapInTokens;
        milestone.amountLock = amountLock;
        milestone.price = price;
    }

    function insertMilestone(uint8 index, uint256 start, uint256 end, uint256 referralBonus, uint256 minInvestedLimit, uint256 maxInvestedLimit, uint256 tokensSold, uint256 hardcapInTokens, uint256 amountLock, uint256 price) public onlyOwner {
        require(index < milestones.length);
        for (uint i = milestones.length; i > index; i--) {
            milestones[i] = milestones[i - 1];
        }
        milestones[index] = Milestone(start, end, referralBonus, minInvestedLimit, maxInvestedLimit, tokensSold, hardcapInTokens, amountLock, price);
    }

    function clearMilestones() public onlyOwner {
        require(milestones.length > 0);
        for (uint i = 0; i < milestones.length; i++) {
            delete milestones[i];
        }
    }

    function currentMilestone() public view returns (uint256) {
        for (uint256 i = 0; i < milestones.length; i++) {
            if (now >= milestones[i].start && now < milestones[i].end && milestones[i].tokensSold <= milestones[i].hardcapInTokens) {
                return i;
            }
        }
        revert();
    }

}
