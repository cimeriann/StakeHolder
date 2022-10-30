const { ethers } = require("ethers");

async function deploy(){
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    console.log("Account Balance:", (await deployer.getBalance()))
    const StakeHolder = await ethers.ContractFactory.getContract("StakeHolder");

    await ethers.deploy(StakeHolder);
};