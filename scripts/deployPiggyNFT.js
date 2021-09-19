const { ethers } = require("hardhat");

async function main() {
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );
  const PiggyNFT = await ethers.getContractFactory("PiggyNFT");
  const piggyNFT = await PiggyNFT.deploy();

  await piggyNFT.deployed();
  await run("verify:verify", {
    address: piggyNFT.address,
    constructorArguments: [],
  });

  console.log("Piggy NFT deployed to:", piggyNFT.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
