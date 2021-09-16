const { ethers } = require("hardhat");

async function main() {
  //config address piggyCharacter;
  const piggyNFTAddress = "";
  //config address piggyToken;
  const piggyTokenAddress = "";
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );

  const PiggyMarketPlace = await ethers.getContractFactory("PiggyMarketPlace");
  const piggyMarketPlace = await PiggyMarketPlace.deploy(
    piggyNFTAddress,
    piggyTokenAddress
  );
  await piggyMarketPlace.deployed();

  console.log("Piggy Market Place deployed to:", piggyMarketPlace.address);
  await run("verify:verify", {
    address: piggyMarketPlace.address,
    constructorArguments: [piggyNFTAddress, piggyTokenAddress],
  });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
