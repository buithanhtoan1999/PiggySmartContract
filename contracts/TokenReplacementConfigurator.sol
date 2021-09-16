// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.12;

import "@openzeppelin/contracts/math/SafeMath.sol";
import "./PiggyToken.sol";
import "./FreezeTokenWallet.sol";
import "./RetrieveTokensFeature.sol";
import "./TokenDistributor.sol";


/**
 * @dev Contract-helper for PiggyToken deployment and token distribution.
 *
 * 1. Private Sale (3%): 300,000,000 PIGI. The total freezing period is 12 months.
 *     30% of the initial amount will be opened after buying. 30% of amount will be opened after 180 days and 40% will be opened after 360 days and 
 *
 * 2. Public Sale (12%): 1,200,000,000 PIGI. Include 3 rounds
      - Round 1 : 3% 
        + Price: $0.002
        + Amount: 300,000,000 PIGI
        + Policy: 50% will be opened right away, 20% after 90 days, 30% after 120 days and referral = 8%
    - Round 2: 5%
        + Price: $0.003
        + Amoumt: 500,000,000 PIGI
        + Privacy and unlock: 75% will be opened right away, 25% after 90 days and referral = 8%
    - Round 3: 5%
        + Price: $0.005
        + Amount: 500,000,000 PIGI
        + Privacy and unlock: 100% will be unlocked right away and refferal = 8%
 *
 * 3. Marketing (7%): 700,000,000 PIGI.
 *
 * 4. Game Reward (25%): 2,500,000,000 PIGI 
 *
 *
 * 5. Team (15%): 1,500,000,000 PIGI. The total freezing period is 24 months.
 *
 *
 * 6. Advisors (5%): 500,000,000  PIGI. The total freezing period is 24 months.
 *
 *
 * 6. Liquidity Reserve(33%): 3,300,000,000 PIGI 
 */
contract TokenReplacementConfigurator is RetrieveTokensFeature {
    using SafeMath for uint256;

    uint256 private constant TEAM_AMOUNT               = 1500000000 * 1 ether;
    uint256 private constant MARKETING_AMOUNT          = 700000000 * 1 ether;
    uint256 private constant LIQUIDITY_RESERVE         = 3300000000 * 1 ether;
    uint256 private constant ADVISORS_AMOUNT           = 500000000 * 1 ether;

    address private constant OWNER_ADDRESS             = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant TEAM_WALLET_OWNER_ADDRESS = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant MARKETING_WALLET_ADDRESS  = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant LIQUIDITY_WALLET_ADDRESS  = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant ADVISORS_WALLET_ADDRESSES = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);

    uint256 private constant STAGE1_START_DATE         = 1631620800;    // Sep 14 2021 12:00:00 GMT+0100

    PiggyToken public token;

    FreezeTokenWallet public teamWallet;
    FreezeTokenWallet public advisorsWallet;
    TokenDistributor public tokenDistributor;

    constructor () public {
        address[] memory addresses = new address[](4);
        uint256[] memory amounts = new uint256[](4);
        
        teamWallet = new FreezeTokenWallet();
        advisorsWallet = new FreezeTokenWallet();
        tokenDistributor = new TokenDistributor();
 
        addresses[0]    = address(teamWallet);
        amounts[0]      = TEAM_AMOUNT;
        addresses[1]    = MARKETING_WALLET_ADDRESS;
        amounts[1]      = MARKETING_AMOUNT;
        addresses[2]    = address(advisorsWallet);
        amounts[2]      = ADVISORS_AMOUNT;
        addresses[3]    = LIQUIDITY_WALLET_ADDRESS;
        amounts[3]      = LIQUIDITY_RESERVE;

        token = new PiggyToken(addresses, amounts);

        teamWallet.setToken(address(token));
        teamWallet.setStartDate(STAGE1_START_DATE);
        teamWallet.setDuration(900);                //  24 months = 720 days
        teamWallet.setInterval(90);                 // 3 months = 90 days
        teamWallet.start();

        advisorsWallet.setToken(address(token));
        advisorsWallet.setStartDate(STAGE1_START_DATE);
        advisorsWallet.setDuration(360);           // 24 months = 720 days
        advisorsWallet.setInterval(90);            // 3 months = 90 days
        advisorsWallet.start();
        
        tokenDistributor.setToken(address(token));

        token.transferOwnership(OWNER_ADDRESS);
        teamWallet.transferOwnership(TEAM_WALLET_OWNER_ADDRESS);
        advisorsWallet.transferOwnership(MARKETING_WALLET_ADDRESS);
    }

}
