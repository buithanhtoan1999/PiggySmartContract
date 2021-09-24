const { ethers } = require("hardhat");
const { expect } = require("chai");
const { formatEther } = require("@ethersproject/units");

let transaction, balancePigiAcc1, balancePigiAcc2, balanceDeployer;
const time = Math.floor(new Date().getTime() / 1000.0);
const priceBUSD = "1000000000000000";
const timeStart = time;
const timeEnd = time + 800;
const referralBonus = 8; //8%
const amountLock = 30; //30%
const hardCap = "300000000000000000000000000"; //300,000,000 PIGI
const minInvestedLimit = "100000000000000000000"; // 100 USD
const maxInvestedLimit = "5000000000000000000000"; // 5000 USD
const maxUint256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
describe("Piggy Sale ", async function () {
  it("Full test flow", async function () {
    const [deployer, account1, account2] = await ethers.getSigners();
    console.log(account1.address);
    const PiggyTokenTest = await ethers.getContractFactory("PiggyTokenTest");
    const BUSDToken = await ethers.getContractFactory("BEP20Token");
    const PiggySale = await ethers.getContractFactory("PiggySale");
    const piggyTokenTest = await PiggyTokenTest.deploy();
    await piggyTokenTest.deployed();
    console.log(
      "1. Piggy Token deploy at address https://testnet.bscscan.com/tx/" +
        piggyTokenTest.address
    );

    const BUSD = await BUSDToken.deploy();
    await BUSD.deployed();
    console.log(
      "2. BUSD deploy  at address https://testnet.bscscan.com/tx/" + BUSD.address
    );

    const piggySale = await PiggySale.deploy(
      deployer.address,
      BUSD.address,
      piggyTokenTest.address
    );

    await piggySale.deployed();
    console.log(
      "3. Piggy Sale deploy at address https://testnet.bscscan.com/tx/" +
        piggySale.address
    );
    transaction = await BUSD.connect(account1).approve(
      piggySale.address,
      maxUint256
    );
    console.log(
      "4. Approve BUSD at address https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggySale
      .connect(deployer)
      .addMilestone(
        timeStart,
        timeEnd,
        referralBonus,
        minInvestedLimit,
        maxInvestedLimit,
        "0",
        hardCap,
        amountLock,
        priceBUSD
      );
    console.log(
      "5. Owner add price at: https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    balanceDeployer = await piggyTokenTest.balanceOf(deployer.address);
    console.log(formatEther(balanceDeployer));
    transaction = await BUSD.connect(deployer).mint(
      account1.address,
      "100000000000000000000"
    );
    console.log(
      "6. Mint for account 1 100,000 BUSD at https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyTokenTest
      .connect(deployer)
      .approve(piggySale.address, maxUint256);
    console.log(
      "7.Owner wallet approve for contract piggy sale at tx https://testnet.bscscan.com/tx/" +
        transaction.hash
    );

    transaction = await piggySale
      .connect(account1)
      .buyToken("100000000000000000000", account2.address);
    console.log(
      "8.Account 1 buy 100 USD at transaction https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    balancePigiAcc1 = await piggyTokenTest.balanceOf(account1.address);
    console.log(
      "9.Balance PIGI of Account1 is:  " + formatEther(balancePigiAcc1) + "PIGI"
    );
    balancePigiAcc2 = await piggyTokenTest.balanceOf(account2.address);
    console.log(
      "10.Balance PIGI of account 2 is:  " +
        formatEther(balancePigiAcc2) +
        "PIGI"
    );
    balanceDeployer = await BUSD.balanceOf(deployer.address);
    console.log("11.Balance BUSD of owner:  " + formatEther(balanceDeployer));
  }).timeout(40000000000000);
});
