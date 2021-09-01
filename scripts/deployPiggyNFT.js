const { ethers } = require("hardhat");

async function main() {
  let transaction;
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );
  const PiggyNFT = await ethers.getContractFactory("PiggyCore");
  const piggyNFT = await PiggyNFT.deploy();

  await piggyNFT.deployed();
  await run("verify:verify", {
    address: piggyNFT.address,
    constructorArguments: [],
  });

  for (i = 0; i < 100; i++) {
    transaction = await piggyNFT.connect(deployer).mint(deployer.address, i);
    console.log(transaction.hash + "Mint token ID " + i);
  }

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
