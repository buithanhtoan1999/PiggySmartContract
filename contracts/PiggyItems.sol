// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.6.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PiggyItems is ERC721, Ownable {

    mapping(address => bool) public isMinter;

    modifier onlyMinter() {
        require(isMinter[msg.sender], "not minter");
        _;
    }

    constructor() public ERC721("PiggyItems", "PIGINFT") {
        isMinter[msg.sender] = true;
    }

    function mint(address to, uint256 tokenId) public onlyMinter {
        _mint(to, tokenId);
    }

    function burn(uint256 tokenId) public onlyOwner {
        _burn(tokenId);
    }

    function setMinter(address _minter) public onlyOwner {
        require(!isMinter[_minter], "Already minter");
        isMinter[_minter] = true;
    }

    function removeMinter(address _minter) public onlyOwner {
        require(isMinter[_minter], "Not minter");
        isMinter[_minter] = false;
    }
}