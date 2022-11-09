// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

/// @title PriceConverter
/// @author Shootfish XYZ
library PriceConverter {
    /// @notice Returns the price of AVAX/USD in 18 decimals
    /// @dev see https://docs.chain.link/docs/data-feeds/price-feeds/addresses/?network=avalanche
    /// @return price Price of AVAX in USD to 18 decimals
    function getPrice() internal view returns (uint256 price) {
        uint256 price;
        uint8 DECIMALS = 18;

        /// FUJI: 0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        /// AVAX C-CHAIN: 0x0A77230d17318075983913bC2145DB16C7366156
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x5498BB86BC934c8D34FDA08E81D444153d0D06aD
        );
        (, int256 answer, , , ) = priceFeed.latestRoundData();

        if (DECIMALS >= priceFeed.decimals()) {
            price = answer * (10**(DECIMALS - priceFeed.decimals()));
        } else {
            price = answer / (10**(priceFeed.decimals() - DECIMALS));
        }
    }

    /// @notice Returns the USD equivalent of AVAX amount in 18 decimals
    /// @param _avax AVAX value to be converted to USD
    /// @return usd USD equivalent of AVAX value to 18 decimals
    function getUsdAmount(uint256 _avax) internal view returns (uint256 usd) {
        uint8 DECIMALS = 18;
        uint256 avaxPrice = getPrice();
        usd = (_avax * avaxPrice) / (10**DECIMALS);
    }

    /// @notice Returns the AVAX equivalent of USD amount in 18 decimals
    /// @param _usd USD value to be converted to AVAX
    /// @return avax AVAX equivalent of USD value to 18 decimals
    function getAvaxAmount(uint256 _usd) internal view returns (uint256 avax) {
        uint8 DECIMALS = 18;
        uint256 avaxPrice = getPrice();
        avax = (_usd * (10**DECIMALS)) / avaxPrice;
    }
}
