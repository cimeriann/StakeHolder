// SPDX-License-Identifier: MIT
pragma solidity  >=0.6.6;

contract StakeHolder {
    address public immutable contractOwner;
    address [] whiteList;
    
    constructor() {
        contractOwner = msg.sender;
    };
}