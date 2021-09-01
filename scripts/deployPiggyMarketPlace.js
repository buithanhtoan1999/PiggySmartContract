const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );
  const PiggyToken = await ethers.getContractFactory("PiggyMarketPlace");
  const piggyToken = await PiggyToken.deploy();

  await piggyToken.deployed();
  await run("verify:verify", {
    address: piggyToken.address,
    constructorArguments: [],
  });

  console.log("Piggy Token deployed to:", piggyToken.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
