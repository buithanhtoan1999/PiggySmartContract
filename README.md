# PIGGY SMART CONTRACT

## CONTRACTS

The source code includes 11 smartcontracts include:

- FreezeTokenWallet - A wallet for frozen team tokens
- IPiggyMarketPlace - Interface of market place contract
- PiggyCharacter - NFT Piggy Character
- PiggyItems - NFT Piggy Items
- PiggyMarketPlace - Market Place contract
- PiggySale - Sale Contract
- PiggyToken - Token contract
- RetrieveTokensFeature
- StagedCrowdsale -library for sale contract
- TokenDistributor - distributor contract
- TokenReplacementConfigrator - contract deployment

## Set up variable environment

1. .env file for deployment

```javascript
// BSC API for verifying. can get on https://bscscan.com/myapikey
BSC_API_KEY=
// Testnet private key
TESTNET_PRIVATE_KEY=
// Mainnet private key
BSC_PRIVATE_KEY=
```

2. .secret file (optional)

- Make file .secret and push bsc testnet seed phase for testing on bsc testnet

3. Configiure wallet address of OWNER*ADDRESS, TEAM* WALLET, MARKETING_WALLET, ADVISORS_WALLET and amount on file contracts/TokenReplacementConfigure.sol

```javascript
    address private constant OWNER_ADDRESS             = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant TEAM_WALLET_OWNER_ADDRESS = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant MARKETING_WALLET_ADDRESS  = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant LIQUIDITY_WALLET_ADDRESS  = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
    address private constant ADVISORS_WALLET_ADDRESSES = address(0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303);
```

## Deploy Factory smart contract

Project currently use hardhat for deployment. The variable should import from process.env or similar datasource:

## Plugins

## Deploy Token Configrator contract

1. Import hardhat library, embed ethers, upgrades modules

```javascript
const { ethers } = require("hardhat");
```

2. Set up address and amount for token

```javascript
config MARKETING WALLET
const MARKETING_WALLET_ADDRESS = "0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303";
const LIQUIDITY_WALLET_ADDRESS = "0x68CE6F1A63CC76795a70Cf9b9ca3f23293547303";
const TEAM_AMOUNT = "1500000000000000000000000000";
const MARKETING_AMOUNT = "700000000000000000000000000";
const LIQUIDITY_RESERVE = "3300000000000000000000000000";
const ADVISORS_AMOUNT = "500000000000000000000000000";
```

3. Configure your revenue address before deploy

```javascript
const [deployer] = await ethers.getSigners();
```

4. Log your address of Piggy token deployment

```javascript
console.log(
  "Deploying Piggy Token contracts with the account:",
  deployer.address
);
```

5. Get contract factory prototype

```javascript
const TokenReplacementConfigurator = await ethers.getContractFactory(
  "TokenReplacementConfigurator"
);
```

6. Deploy Token Replacement Configrator

```javascript
const tokenReplacementConfigurator =
  await TokenReplacementConfigurator.deploy();
```

7. Verify Token Replacement Configrator on bscscan

```javascript
await run("verify:verify", {
  address: tokenReplacementConfigurator.address,
  constructorArguments: [],
});
```

8. Get Address Of Pigi token

```javascript
const pigiToken = await tokenReplacementConfigurator.token();
```

9. Get Address Of team wallet

```javascript
const teamWallet = await tokenReplacementConfigurator.teamWallet();
```

10. Get Address Of advisors wallet

```javascript
const advisorsWallet = await tokenReplacementConfigurator.advisorsWallet();
```

11. Get Address Of token distributor

```javascript
const tokenDistributor = await tokenReplacementConfigurator.tokenDistributor();
```

12. Set up address and amount for verifying token PIGI

```javascript
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
```

13. Verify Pigi token

```javascript
await run("verify:verify", {
  address: pigiToken,
  constructorArguments: [addresses, amounts],
});
```

14. Verify Team wallet

```javascript
await run("verify:verify", {
  address: teamWallet,
  constructorArguments: [],
});
```

15. Verify Advisors wallet

```javascript
await run("verify:verify", {
  address: teamWallet,
  constructorArguments: [],
});
```

16. Verify token Distributor

```javascript
await run("verify:verify", {
  address: tokenDistributor,
  constructorArguments: [],
});
```

17. Log the address and wait for deploy success

```javascript
console.log("Piggy Token deployed to:", piggyToken.address);
```

## Deploy Piggy Character contract

1. Import hardhat library, embed ethers, upgrades modules

```javascript
const { ethers } = require("hardhat");
```

2. Configure your revenue address before deploy

```javascript
const [deployer] = await ethers.getSigners();
```

3. Log your address of Piggy Character deployment

```javascript
console.log(
  "Deploying Piggy Character contracts with the account:",
  deployer.address
);
```

4. Get contract factory prototype

```javascript
const PiggyCharacter = await ethers.getContractFactory("PiggyCharacter");
);
```

5. Deploy Piggy Character

```javascript
const piggyCharacter = await PiggyCharacter.deploy();
```

6. Wait contract deployed

```javascript
await piggyCharacter.deployed();
```

7. Verify contract on BSC scan

```javascript
await run("verify:verify", {
  address: piggyCharacter.address,
  constructorArguments: [],
});
```

8. Mint character on bscscan

```javascript
for (i = 1; i <= 21; i++) {
  transaction = await piggyCharacter
    .connect(deployer)
    .mint(deployer.address, i + 1);
  console.log(
    "Mint token ID " +
      i +
      "at tx https://testnet.bscscan.com/tx/" +
      transaction.hash
  );
}
```

9. Configure address after deploy

```javascript
console.log("Piggy NFT deployed to:", piggyCharacter.address);
```

## Deploy Piggy Items contract

1. Import hardhat library, embed ethers, upgrades modules

```javascript
const { ethers } = require("hardhat");
```

2. Configure your revenue address before deploy

```javascript
const [deployer] = await ethers.getSigners();
```

3. Log your address of Piggy Items deployment

```javascript
console.log(
  "Deploying Piggy Items contracts with the account:",
  deployer.address
);
```

4. Get contract factory prototype

```javascript
const PiggyItems = await ethers.getContractFactory("PiggyItems");
```

5. Deploy Piggy Character

```javascript
const piggyItems = await PiggyItems.deploy();
```

6. Wait contract deployed

```javascript
await piggyItems.deployed();
```

7. Verify contract on BSC scan

```javascript
await run("verify:verify", {
  address: piggyItems.address,
  constructorArguments: [],
});
```

8. Mint character on bscscan

```javascript
for (i = 1; i <= 36; i++) {
  transaction = await piggyItems
    .connect(deployer)
    .mint(deployer.address, i + 1);
  console.log(
    "Mint token ID " +
      i +
      "at tx https://testnet.bscscan.com/tx/" +
      transaction.hash
  );
}
```

9. Configure address after deploy

```javascript
console.log("Piggy NFT deployed to:", piggyItems.address);
```

## Deploy Piggy Market Place Character contract

1. Import hardhat library, embed ethers, upgrades modules

```javascript
const { ethers } = require("hardhat");
```

2. Set up address of piggy token and piggy character NFT address

```javascript
//config address piggyCharacter;
const piggyNFTAddress = "";
//config address piggyToken;
const piggyTokenAddress = "";
```

3. Configure your revenue address before deploy

```javascript
const [deployer] = await ethers.getSigners();
```

4. Log your address of Piggy Items deployment

```javascript
console.log(
  "Deploying Piggy Items contracts with the account:",
  deployer.address
);
```

5. Get contract factory prototype

```javascript
const PiggyMarketPlaceCharacter = await ethers.getContractFactory(
  "PiggyMarketPlaceCharacter"
);
```

6. Deploy Piggy Market Place Character

```javascript
const piggyMarketPlaceCharacter = await PiggyMarketPlaceCharacter.deploy();
```

7. Wait contract deployed

```javascript
await piggyMarketPlaceCharacter.deployed();
```

7. Verify contract on BSC scan

```javascript
await run("verify:verify", {
  address: piggyMarketPlaceCharacter.address,
  constructorArguments: [piggyNFTAddress, piggyTokenAddress],
});
```

8. Configure address after deploy

```javascript
console.log("Piggy NFT deployed to:", piggyMarketPlaceCharacter.address);
```

## Deploy Piggy Market Place Items contract

1. Import hardhat library, embed ethers, upgrades modules

```javascript
const { ethers } = require("hardhat");
```

2. Set up address of piggy token and piggy character NFT address

```javascript
//config address piggyCharacter;
const piggyNFTAddress = "";
//config address piggyToken;
const piggyTokenAddress = "";
```

3. Configure your revenue address before deploy

```javascript
const [deployer] = await ethers.getSigners();
```

4. Log your address of Piggy Items deployment

```javascript
console.log(
  "Deploying Piggy Items contracts with the account:",
  deployer.address
);
```

5. Get contract factory prototype

```javascript
const PiggyMarketPlaceItems = await ethers.getContractFactory(
  "PiggyMarketPlace"
);
```

6. Deploy Piggy Market Place Character

```javascript
const piggyMarketPlaceItems = await PiggyMarketPlaceItems.deploy();
```

7. Wait contract deployed

```javascript
await piggyMarketPlaceItems.deployed();
```

7. Verify contract on BSC scan

```javascript
await run("verify:verify", {
  address: piggyMarketPlaceItems.address,
  constructorArguments: [piggyNFTAddress, piggyTokenAddress],
});
```

8. Configure address after deploy

```javascript
console.log("Piggy NFT deployed to:", piggyMarketPlaceItems.address);
```

## Component

## License

# Piggy-smartcontract

```

```
