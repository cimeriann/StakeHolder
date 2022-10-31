/** 
  @type import('hardhat/config').HardhatUserConfig
  */
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const {
  AVALANCHE_MAIN_PRIVATE_KEY,
  AVALANCHE_TEST_PRIVATE_KEY,
  TESTNET_API_URL,
  MAINNET_API_URL
} = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    avalancheTest: {
      url: TESTNET_API_URL,
      gasPrice: 500000000000,
      maxPriorityFee: 15000000000,
      chainId: 43113,
      accounts: [`0x${AVALANCHE_TEST_PRIVATE_KEY}`],
    },
    avalancheMain: {
      url: MAINNET_API_URL,
      gasPrice: 500000000000,
      maxPriorityFee: 15000000000,
      chainId: 43114,
      accounts: [`0x${AVALANCHE_MAIN_PRIVATE_KEY}`],
    },
  },
};
