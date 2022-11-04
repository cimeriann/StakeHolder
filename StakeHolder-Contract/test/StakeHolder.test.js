const { expect } = require("chai");
const { ethers } = require("hardhat");
require('dotenv').config();
const {
  AVALANCHE_MAIN_PRIVATE_KEY,
  AVALANCHE_TEST_PRIVATE_KEY,
  TESTNET_API_URL,
  MAINNET_API_URL,
  PROVIDER,
  SENDERPK,
  SENDER,
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
    })

    describe("constructor", async () => {
      it("should set contract deployer to owner of contract", async () => {
        const contractOwner = await stakeHolder.contractOwner();
        // console.log(contractOwner)
        expect(deployer['address']).to.equal(contractOwner);
      });
    });

    describe("contract functions", () =>{
        // it("should receive funds when the fund function is called", async () =>{
        //     const value = ethers.utils.parseEther('100');
        //     let wallet = new ethers.Wallet(AVALANCHE_TEST_PRIVATE_KEY, TESTNET_API_URL);
        //     const tx = {
        //         to: stakeHolder.address,
        //         value: ethers.utils.parseEther("100")
        //     }
        //     const txReceipt = await wallet.sendTransaction(tx);
        //     const stakeHolderBalance = await ethers.provider.getBalance(stakeHolder['address']);
        //     expect(stakeHolderBalance).to.equal(value.toString());
        // });
        const sender = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
        it("should revert when funds sent is too low", async () => {
            const provider = waffle.provider
            expect(await provider.getBalance(stakeHolder.address)).to.equal(0);
        });
        it("should withdraw all funds", async () =>{
            await stakeHolder.withdraw()
            const stakeHolderBalance = await ethers.provider.getBalance(
              stakeHolder["address"]
            );
            expect(stakeHolderBalance.toString()).to.equal("0");
            await deployer.sendTransaction({
                to: stakeHolder.address,
                value: 100000,
                gasLimit: 35000
            });
            expect(stakeHolderBalance.toString().to.equal)("100000");
        });
    });
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
