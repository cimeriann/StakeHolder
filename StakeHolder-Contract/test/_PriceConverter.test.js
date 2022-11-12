const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Price Converter Contract", async () => {
  let deployer;
  let priceConverter;
  let addr;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const PriceConverter = await ethers.getContractFactory(
      "TestPriceConverter"
    );
    priceConverter = await PriceConverter.deploy();
    // console.log("contract deployed at:", stakeHolder.address);
  });
  afterEach(async () => {
    // cleanup
    deployer = null;
    stakeHolder = null;
  });
  describe("PriceConverter Contract", async () => {
    it("should return the equivalent amount of avax given the amount of usd", async () => {
      let amountInUsd = 100;
      let expectedAmount = 7;
      let amountOfAvax = await priceConverter._getAvaxEquivalent(amountInUsd);
      expect(amountOfAvax.toString()).to.equal(expectedAmount.toString());
    });
    it("should return the price of one avax", async () => {
      let avaxPrice = ethers.BigNumber.from(13.38400737);
      let decimals = 10 ** 18;
      let price = await priceConverter._getPrice();
      expect((avaxPrice * decimals).toString()).to.equal(price.toString());
    });
  });
});
