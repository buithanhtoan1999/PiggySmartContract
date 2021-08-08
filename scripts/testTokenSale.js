const { ethers } = require("hardhat");
let transaction;
async function main() {
  const [signer, acc1, acc2] = await ethers.getSigners();
  const piggySaleAddress = "0x4906552d0d6e8962CFAE7ca64d7809b81791810A";
  console.log(signer, acc1, acc2);
  const piggySale = await ethers.getContractAt("PiggySale", piggySaleAddress);
  const BUSD = await ethers.getContractAt("ERC20", " ");
  transaction = await BUSD.connect(acc1).approve(
    piggySale.address,
    "1000000000000000000000000000000000"
  );
  console.log("approve at " + transaction.hash);
  transaction = await piggySale
    .connect(deployer)
    .buyPiggyBNB("", 15, { value: "1500000000000000" });
  console.log("buy BNB at " + transaction.hash);
  transaction = await piggySale.connect(deployer).buyPiggyBUSD("", 20);
  console.log("buy BUSD at " + transaction.hash);
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
