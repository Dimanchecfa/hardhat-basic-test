// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";


contract Bank is ReentrancyGuard {
    using Address for address payable;
    mapping(address => uint256) public balanceOf;

    // deposit ether funds
    function deposit() external payable {
        balanceOf[msg.sender] += msg.value;
    }

    // withdraw ether funds

    function withdraw() external nonReentrant{
        uint256 amount = balanceOf[msg.sender];
        payable(msg.sender).sendValue(amount);
        balanceOf[msg.sender] = 0;
    }
}
