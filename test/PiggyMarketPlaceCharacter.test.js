const { ethers } = require("hardhat");

let transaction, balance;
const time = Math.floor(Date.now() / 1000);
const maxUint256 =
  "115792089237316195423570985008687907853269984665640564039457584007913129639935";
const expireTimestamp = 88400;
describe("Piggy Market Place Character", async function () {
  it("Full test flow", async function () {
    const [deployer, account1] = await ethers.getSigners();
    const PiggyTokenTest = await ethers.getContractFactory("PiggyTokenTest");
    const PiggyCharacter = await ethers.getContractFactory("PiggyCharacter");
    const PiggyMarketPlace = await ethers.getContractFactory(
      "PiggyMarketPlace"
    );
    console.log(account1.address);
    const piggyTokenTest = await PiggyTokenTest.deploy();
    await piggyTokenTest.deployed();
    console.log(
      "1. Piggy token deploy at address https://testnet.bscscan.com/tx/" +
        piggyTokenTest.address
    );

    const piggyCharacter = await PiggyCharacter.deploy();
    await piggyCharacter.deployed();
    console.log(
      "2. Piggy Character deploy at address https://testnet.bscscan.com/tx/" +
        piggyCharacter.address
    );

    const piggyMarketPlace = await PiggyMarketPlace.deploy(
      piggyCharacter.address,
      piggyTokenTest.address
    );

    await piggyMarketPlace.deployed();
    console.log(
      "3. Piggy Market Place deploy at address https://testnet.bscscan.com/tx/" +
        piggyMarketPlace.address
    );
    transaction = await piggyCharacter
      .connect(deployer)
      .setApprovalForAll(piggyMarketPlace.address, true);
    console.log(
      "4. Owner approve for all NFT ID at address https://testnet.bscscan.com/tx/" +
        transaction.hash
    );

    transaction = await piggyCharacter
      .connect(deployer)
      .mint(deployer.address, 1);
    console.log(
      "5.Mint token id 1 for owner at transaction https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyCharacter
      .connect(deployer)
      .mint(deployer.address, 3);
    console.log(
      "6.Mint token id 2 for owner at transaction https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyMarketPlace
      .connect(deployer)
      .listToken(1, "29859000000000000000000");

    console.log(
      `7. List token id 1 for owner at transaction https://testnet.bscscan.com/tx/` +
        transaction.hash
    );

    transaction = await piggyTokenTest
      .connect(deployer)
      .mint(account1.address, "100000000000000000000000");
    console.log(
      "8.Piggy Token mint for account1 100,000 at address https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyTokenTest
      .connect(account1)
      .approve(piggyMarketPlace.address, maxUint256);
    console.log(
      "9. Account 1  approve for piggy market place at address https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyMarketPlace
      .connect(account1)
      .buyToken(1, { gasLimit: 1000000 });
    console.log(
      "10. Account 2 buy token ID  for bid token ID = 1 at tx https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
    transaction = await piggyMarketPlace
      .connect(account1)
      .enterBidForToken("3", "500000000000000000000", time + expireTimestamp, {
        gasLimit: 1000000,
      });
    console.log(
      "11. Account 2 enter  for bid token ID = 1 at tx https://testnet.bscscan.com/tx/" +
        transaction.hash
    );

    transaction = await piggyMarketPlace
      .connect(deployer)
      .acceptBidForToken(3, account1.address, { gasLimit: 1000000 });
    console.log(
      "12. Owner accept bid for account 2 at https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
  }).timeout(40000000000);
});
