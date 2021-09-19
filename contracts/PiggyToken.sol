// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyToken is ERC20, Ownable {
    
    constructor(address[] memory addresses, uint256[] memory amounts) public ERC20("PiggyToken", "PIGI") {
        for(uint8 i = 0; i < addresses.length; i++) {
           _mint(addresses[i], amounts[i]);
        }
    }
    
      /**
     * @dev Destroys `amount` tokens from the caller.
     *
     * See {ERC20-_burn}.
     */
    function burn(uint _amount) public onlyOwner {
        _burn(msg.sender, _amount);
    }
}
