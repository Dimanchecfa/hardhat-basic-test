//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

interface IERC721 {
    function transferFrom(address _from, address _to, uint256 _id) external;
}

contract Escrow {
    address public nftAddress;
    uint256 public nftId;
    address public seller;
    address public purchasePrice;
    address public escrowAmount;
    address public buyer;
    address public inspector;
    address public lender;

    constructor (address _nftAddress, uint256 _nftId , address _nftSeller, address _nftBuyer , address _nftInspector, address _nftLender , address _nftPurchasePrice, address _nftEscrowAmount) {
        nftAddress = _nftAddress;
        nftId = _nftId;
        purchasePrice = _nftPurchasePrice;
        escrowAmount = _nftEscrowAmount;
        seller = _nftSeller;
        buyer = _nftBuyer;
        lender = _nftLender;
        inspector = _nftInspector;

    }


    function finalizeSale() public {
        IERC721(nftAddress).transferFrom(seller, buyer, nftId);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}