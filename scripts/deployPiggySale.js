const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Sale contracts with the account:",
    deployer.address
  );
  let transaction;
  const time = await Math.floor(new Date().getTime() / 1000.0);
  const minAmount = "10";
  const priceBNB = "100000000000000";
  const priceBUSD = "100000000000000000";
  const timeStart = time + 200;
  const timeEnd = time + 800;
  const capSale = "50000000000000000000";

  const piggyToken = await ethers.getContractAt(
    "ERC20",
    "0x132087ee3e0D006d20Ed2E63669921ab13e4bD7b"
  );
  const BUSD = await ethers.getContractAt(
    "ERC20",
    "0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7"
  );

  const PiggySale = await ethers.getContractFactory("PiggySale");
  const piggySale = await PiggySale.deploy(
    minAmount,
    priceBNB,
    priceBUSD,
    timeStart,
    timeEnd,
    capSale
  );

  await piggySale.deployed();
  transaction = await piggyToken
    .connect(deployer)
    .approve(
      piggySale.address,
      "100000000000000000000000000000000000000000000"
    );
  console.log("approve piggyToken: " + transaction.hash);
  transaction = await BUSD.connect(deployer).approve(
    piggySale.address,
    "100000000000000000000000000000000000000000000000"
  );
  console.log("approve BUSD Token: " + transaction.hash);
  transaction = await piggySale
    .connect(deployer)
    .addPrice(
      "200000000000000",
      "200000000000000000",
      time + 1000,
      time + 16000,
      "50000000000000000000"
    );
  console.log("add price at: " + transaction.hash);
  transaction = await run("verify:verify", {
    address: piggySale.address,
    constructorArguments: [
      minAmount,
      priceBNB,
      priceBUSD,
      timeStart,
      timeEnd,
      capSale,
    ],
  });
  console.log("Piggy Sale deployed to:", piggySale.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
