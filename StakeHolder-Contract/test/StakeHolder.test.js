const { expect } = require("chai");
const { ethers } = require("hardhat");

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
    })

    describe("constructor", async () => {
      it("should set contract deployer to owner of contract", async () => {
        const contractOwner = await stakeHolder.contractOwner();
        // console.log(contractOwner)
        expect(deployer['address']).to.equal(contractOwner);
      });
    });
//   it("constructor", async () => {

//     const waitingToStakeStat = true;
//     expect(await stakeHolder.status.waitingToStake).to.equal(
//       waitingToStakeStat
//     );
//   });
});



//   it("the fund function should send avax to the smart contract", async () => {
//     //hold on for now
//   });

//   it("the withdraw function should withdraw funds from the smartcontract", async () => {
//     //should only work if the "caller" of withdraw is the contractOwner
//     //hold on for now
//   });

//   it("the addFunder function should add a funder to the funders' list", async () => {
//     //hold on for now
//   });

//   it("activate function should return true if staking has begun, else false", async () => {
//     //hold on for now
//   });
// });

// describe("Price Converter smart contract", async function () {
//   it("getPrice should return the price of avax in dollars", async function () {
//     const [signer] = ethers.getSigners();
//   });
// });
