const { expect } = require("chai");
const { ethers } = require("hardhat");
require("dotenv").config();
const {
  AVALANCHE_MAIN_PRIVATE_KEY,
  AVALANCHE_TEST_PRIVATE_KEY,
  TESTNET_API_URL,
  MAINNET_API_URL,
} = process.env;

describe("StakeHolder Contract", async () => {
  let deployer;
  let stakeHolder;
  let addr;
  beforeEach(async () => {
    [deployer] = await ethers.getSigners();
    const StakeHolder = await ethers.getContractFactory("StakeHolder");
    stakeHolder = await StakeHolder.deploy();
    // console.log("contract deployed at:", stakeHolder.address);
  });
  afterEach(async () => {
    // cleanup
    deployer = null;
    stakeHolder = null;
  });

  describe("constructor", async () => {
    it("should set contract deployer to owner of contract", async () => {
      const contractOwner = await stakeHolder.contractOwner();
      // console.log(contractOwner)
      expect(deployer["address"]).to.equal(contractOwner);
    });
  });

  describe("contract functions", () => {
    it("should withdraw all funds", async () => {
      const value = ethers.utils.parseEther("10");
      await stakeHolder.fund({ value });
      await stakeHolder.withdraw();
      const stakeHolderBalance = await ethers.provider.getBalance(
        stakeHolder["address"]
      );
      expect(stakeHolderBalance.toString()).to.equal("0");
      // expect(await ethers.provider.getBalance(deployer["address"])).to.equal(value);
    });
    it("should have a balance of value if fund() is called", async () => {
      const value = ethers.utils.parseEther("10");
      await stakeHolder.fund({ value });
      const stakeHolderBalance = await ethers.provider.getBalance(
        stakeHolder["address"]
      );
      expect(stakeHolderBalance.toString()).to.equal(value);
    });
    it("should return funderBalance when getFunderBalance is called", async () =>{
      let amountFunded = ethers.utils.parseEther("3");
      await stakeHolder.fund({ 'value' : amountFunded });
      const funderBalance = await stakeHolder.getFunderBalance(
        deployer.address
      );
      // console.log(funderBalance.toString());
      expect(funderBalance.toString()).to.equal(amountFunded);
    });
    it("should return the contract's balance", async () => {
      const balance = await stakeHolder.checkBalance();
      const stakeHolderBalance = await ethers.provider.getBalance(
        stakeHolder["address"]
      );
      expect(stakeHolderBalance.toString()).to.equal(balance.toString());
    });
  });
});
