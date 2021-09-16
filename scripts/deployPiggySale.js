const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Sale contracts with the account:",
    deployer.address
  );
  const PiggySale = await ethers.getContractFactory("PiggySale");
  const piggySale = await PiggySale.deploy();
  await piggySale.deployed();
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
