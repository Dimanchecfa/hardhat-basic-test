// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "./Token.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

interface IReceiver {
    function receiveTokens(address _tokenAdress , uint256 _amount) external;
}

contract FlashLoan is ReentrancyGuard {
    using SafeMath for uint256;
    Token public token;
    uint256 public poolBalance;

    constructor(address _token) {
        token = Token(_token);
    }
    
    function depositTokens(uint256 _amount) external nonReentrant {
        require(_amount > 0, "amount cannot be 0");
        token.transferFrom(msg.sender, address(this), _amount);
        poolBalance = poolBalance.add(_amount);
    }

    function flashLoan(uint256 _barrowAmount) external  nonReentrant { 
        require(_barrowAmount > 0, "amount cannot be 0");

        uint256 balanceBefore = token.balanceOf(address(this));
        
        require(balanceBefore >= _barrowAmount, "not enough tokens in pool");
        // send tokens to receiver
        token.transfer(msg.sender, _barrowAmount);

        //get paid back
        IReceiver(msg.sender).receiveTokens(address(token), _barrowAmount);

        //Ensure loan is repaid

        uint256 balanceAfter = token.balanceOf(address(this));
        require(balanceAfter >= balanceBefore, "loan not repaid");


    }
}
