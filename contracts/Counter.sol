// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Counter {

    string public name;
    uint public count;

    constructor(string memory _name , uint _count) {
        name = _name;
        count = _count;
    }

    function increment() public returns(uint newCount) {
        count ++;
        return count;

    }

    function decrement() public returns(uint newCount) {
        count --;
        return count;
    }

    function getCount() public view returns(uint) {
        return count;
    }

    function setName(string memory _newNAme) public returns(string memory) {
        name = _newNAme;
        return name;
    }

    function getName() public view returns(string memory) {
        return name;
    }

}



   