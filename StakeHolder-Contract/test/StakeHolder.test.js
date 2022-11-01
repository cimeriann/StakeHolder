const { expect } = require("chai");
const { ethers } = require("ethers");

describe("StakeHolder Contract",  async () => {
    it("deployment should set status to WaitingToStake", async () => {
        const [owner] = await ethers.getSigners();

        const StakeHolder = await ethers.getContractFactory("StakeHolder");
        const stakeHolder = await StakeHolder.deploy();
        await stakeHolder.deployed();
        //test incomplete, hold on for now
    });
    it("the fund function should send avax to the smart contract", async function() {
        //hold on for now


    });

    it("the withdraw function should withdraw funds from the smartcontract", async function() {
        //should only work if the "caller" of withdraw is the contractOwner
        //hold on for now

    });

    it("the addFunder function should add a funder to the funders' list", async function(){
        //hold on for now
    });

    it("activate function should return true if staking has begun, else false", async function(){
        //hold on for now
    });


})

describe("Price Converter smart contract", async function(){
    it("getPrice should return the price of avax in dollars", async function(){
    const [signer] = ethers.getSigners();

    })

});