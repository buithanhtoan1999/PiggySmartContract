const hre = require("hardhat");

async function main() {
  const PiggyToken = await hre.ethers.getContractFactory("PiggyToken");
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
