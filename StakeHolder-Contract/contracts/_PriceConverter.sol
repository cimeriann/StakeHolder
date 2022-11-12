// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "./PriceConverter.sol";

contract TestPriceConverter {
    using PriceConverter for uint256;

    function _getAvaxEquivalent(uint256 _amount)
        external
        view
        returns (uint256 avaxEquivalent)
    {
        avaxEquivalent = PriceConverter.getAvaxAmount(_amount);
        return avaxEquivalent;
    }

    function _getPrice() external view returns (uint256 price) {
        price = PriceConverter.getPrice();
    }
}
