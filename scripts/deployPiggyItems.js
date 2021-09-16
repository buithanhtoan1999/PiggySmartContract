const { ethers } = require("hardhat");

async function main() {
  let transaction;
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );
  const PiggyItems = await ethers.getContractFactory("PiggyItems");
  const piggyItems = await PiggyItems.deploy();

  await piggyItems.deployed();
  await run("verify:verify", {
    address: piggyItems.address,
    constructorArguments: [],
    contract: "contracts/PiggyItems.sol:PiggyItems",
  });

  for (i = 1; i <= 36; i++) {
    transaction = await piggyItems.connect(deployer).mint(deployer.address, i);
    console.log(
      "Mint token ID " +
        i +
        ": at tx https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
  }

  console.log("Piggy NFT deployed to:", piggyItems.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
