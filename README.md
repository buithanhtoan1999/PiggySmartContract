# pkkt-contracts

The source code includes 2 smartcontracts: Piggy token and PiggySale to buy Piggy Token:

## Deploy Factory smart contract

Project currently use hardhat for deployment. The variable should import from process.env or similar datasource:

## Plugins

## Deploy Piggy token contract

```

2. Configure your revenue address before deploy

## Components

- IERC20 is an interface for interactions with ERC20 tokens.

- Owned is contract for access control with an owner role.

- Piggy Token is a smart contract for creating token


- PKKTToken contract has following events:

  - event MinterAdded(address indexed account) - emit when minter is added;

  - event MinterRemoved(address indexed account) - emit when minter is removed;

  - event MintingAllowanceUpdated(address indexed account, uint256 oldAllowance, uint256 newAllowance) - emit
    when minting allowance of minter changes ;

- PKKTToken contract has following functions:

  - constructor - public functions that sets name, symbol, decimal, and totalSupply;

  - burn - public function that decreases the amount of token by sending to zero address. Has
    onlyOwner modifier

  - burnFrom - public function that decreases the amount of token of the given address by sending to zero
    address for token. Has onlyOwner modifier

- PiggySale is a smart contract for the users can buy Piggy Token from BUSD or BNB;

- PiggySale is a smart contract for campaign management. PiggySale is Owned, RetreencyGuard and has following parameters

  - address public PIGI = 0x132087ee3e0D006d20Ed2E63669921ab13e4bD7b;

  - address public BUSD = 0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7;;

  - uint256 public min_amount;

  - uint256 public price_current_BUSD;

  - uint256 public price_current_BNB;

  - uint256 public cap_sale_current;

  - uint256 public time_start_current;

  - uint256 public time_end_current;

  - bool public is_sale_token = true;

  - uint256 public price_next_BUSD;

  - uint256 public price_next_BNB;

  - uint256 public time_start_next;

  - uint256 public time_end_next;

  - uint256 public cap_sale_next;

  - uint256 public total_buy_current;

  - uint256 private buy_referral_bonus;

  - event BuyPiggyEvent(uint256 price, uint256 amount): emit when user buy token;

  - event NextPiggySale(uint256 priceBNB, uint256 priceBUSD, uint256 time_start, uint256 time_end, uint256 cap_sale) : emit when update next sale for piggy token

  - modifier onlyForSale;

- Piggy Sale contract has following functions:

  - constructor - public functions that has 6 arguments: min amount of buy token, price of piggy in BNB, price
    of piggy in BUSD, time start sale, time end sale and capital of sale period

  - addPrice - public function that set infomation about next sale. Has onlyOwner modifier

  - setBonus - public function that set the new bonus for referral. Has onlyOwner modifier

  - set - public function that updates allocPoint of the given pool. Has onlyOwner modifier

  - closeSale - public function that close sale which not allow users buy Piggy Token anymore

  - priceCurrent - public function that returns price of PiggyToken in BNB and BUSD

  - isSale - public view function that returns the status of sale period .

  - getSaleInfo - public function that returns the whole of information about sale

  - sendToken - public function that send token for owner

  - checkPrice - public function that updates and check price for buy

  - checkCap - public function that update and check capital of sale

  - buyPiggyBNB - public function that the users buy Piggy Token by BNB native

  - buyPiggyBUSD - public function that the users buy Piggy Token by BUSD token

  - receive - public function that allow contract receive BNB

## License

# Piggy-smartcontract
```
