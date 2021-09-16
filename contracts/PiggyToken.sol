// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyToken is ERC20, Ownable {
    
    constructor(address[] memory addresses, uint256[] memory amounts) public ERC20("PiggyToken", "PIGI") {
        for(uint8 i = 0; i < addresses.length - 1; i++) {
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

    /**
     * @dev Destroys `amount` tokens from `account`, deducting from the caller's
     * allowance.
     *
     * See {ERC20-_burn} and {ERC20-allowance}.
     *
     * Requirements:
     *
     * - the caller must have allowance for ``accounts``'s tokens of at least
     * `amount`.
     */
    function burnFrom(address _account, uint256 _amount) public virtual onlyOwner {
        uint256 decreasedAllowance = 
        allowance(_account, msg.sender).sub(_amount, "ERC20: burn amount exceeds allowance");
        _approve(_account, msg.sender, decreasedAllowance);
        _burn(_account, _amount);
    }

}
