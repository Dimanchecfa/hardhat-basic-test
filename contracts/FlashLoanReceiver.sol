// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./FlashLoan.sol";
import "./Token.sol";


contract FlashLoanReceiver {
    FlashLoan private pool;
    address private owner;

    event LoanReceived(address _tokenAdress , uint256 _amount);

    constructor(address _poolAdress) {
        pool = FlashLoan(_poolAdress);
        owner = msg.sender;
    }

    function receiveTokens(address _tokenAdress , uint256 _amount) external {
        require(msg.sender == address(pool), "only pool can call this function");
        require(Token(_tokenAdress).balanceOf(address(this)) == _amount, "not enough tokens");
        emit LoanReceived(_tokenAdress, _amount);
        
        require(Token(_tokenAdress).transfer(address(pool), _amount), "transfer failed");
    }

    function executeFlashLoan(uint256 _amount) external {
        require(msg.sender == owner, "only owner can execute flash loan");
        pool.flashLoan(_amount);
    }
}