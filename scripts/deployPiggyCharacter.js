const { ethers } = require("hardhat");

async function main() {
  let transaction;
  const deployer = await ethers.getSigner();
  console.log(
    "Deploying Piggy Character contracts with the account:",
    deployer.address
  );
  const PiggyCharacter = await ethers.getContractFactory("PiggyCharacter");
  const piggyCharacter = await PiggyCharacter.deploy();

  await piggyCharacter.deployed();
  await run("verify:verify", {
    address: piggyCharacter.address,
    constructorArguments: [],
    contract: "contracts/PiggyCharacter.sol:PiggyCharacter",
  });

  for (i = 1; i <= 21; i++) {
    transaction = await piggyCharacter
      .connect(deployer)
      .mint(deployer.address, i + 1);
    console.log(
      "Mint token ID " +
        i +
        ": at tx https://testnet.bscscan.com/tx/" +
        transaction.hash
    );
  }

  console.log("Piggy NFT deployed to:", piggyCharacter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
