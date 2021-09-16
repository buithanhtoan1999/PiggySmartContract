const { ethers } = require("hardhat");
const MARKETING_WALLET_ADDRESS = "0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303";
const LIQUIDITY_WALLET_ADDRESS = "0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303";
const TEAM_AMOUNT = "1500000000000000000000000000";
const MARKETING_AMOUNT = "700000000000000000000000000";
const LIQUIDITY_RESERVE = "3300000000000000000000000000";
const ADVISORS_AMOUNT = "500000000000000000000000000";
async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(
    "Deploying Piggy Token contracts with the account:",
    deployer.address
  );
  const TokenReplacementConfigurator = await ethers.getContractFactory(
    "TokenReplacementConfigurator"
  );
  const tokenReplacementConfigurator =
    await TokenReplacementConfigurator.deploy();

  await tokenReplacementConfigurator.deployed();
  //verify contract tokenReplacementConfigurator
  await run("verify:verify", {
    address: tokenReplacementConfigurator.address,
    constructorArguments: [],
  });
  const pigiToken = await tokenReplacementConfigurator.token();
  const teamWallet = await tokenReplacementConfigurator.teamWallet();
  const advisorsWallet = await tokenReplacementConfigurator.advisorsWallet();
  const tokenDistributor =
    await tokenReplacementConfigurator.tokenDistributor();
  const addresses = [
    teamWallet,
    MARKETING_WALLET_ADDRESS,
    advisorsWallet,
    LIQUIDITY_WALLET_ADDRESS,
  ];
  const amounts = [
    TEAM_AMOUNT,
    MARKETING_AMOUNT,
    ADVISORS_AMOUNT,
    LIQUIDITY_RESERVE,
  ];
  await run("verify:verify", {
    address: pigiToken,
    constructorArguments: [addresses, amounts],
  });
  await run("verify:verify", {
    address: teamWallet,
    constructorArguments: [],
  });
  await run("verify:verify", {
    address: advisorsWallet,
    constructorArguments: [],
  });
  await run("verify:verify", {
    address: tokenDistributor,
    constructorArguments: [],
  });

  console.log("Piggy Token deployed to:", tokenReplacementConfigurator.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
