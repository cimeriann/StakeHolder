import { ethers } from "ethers";
// import BN from "bn.js";
import { abi } from "../constants/abi";
import { stakeHolderAddress } from "../constants/constants";

export const Fund = async (fundAmount) => {
  const response = {
    success: `✅Successfully funded ${fundAmount} to StakeHolder`,
    failed: `❌ Failed to send funds`,
  };
  if (fundAmount === "") {
    alert("Please enter an amount in the text field");
  }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await window.ethereum.request({
  // method: "eth_requestAccounts",
  //   });
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const stakeHolder = new ethers.Contract(stakeHolderAddress, abi, signer);
  let value = ethers.utils.parseEther(fundAmount);

  try {
    const txHash = await stakeHolder.fund({ value });
    await listenForTransactionMine(txHash, provider);
    const txTest = await provider.getTransaction(txHash);
    if (txTest) {
      return response.success;
    }
  } catch (err) {
    alert(err);
  }
};

export const Withdraw = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const stakeHolder = new ethers.Contract(stakeHolderAddress, abi, signer);
  const response = {
    success: `✅Successfully withdrawn from StakeHolder`,
    failed: `❌ Failed to withdraw`,
  };
  try {
    const txHash = await stakeHolder.withdraw();
    const txTest = await provider.getTransaction(txHash);
    if (txTest) {
      return response.success;
    }
  } catch (err) {
    alert(err);
  }
};

function listenForTransactionMine(transactionResponse, provider) {
  console.log(`Mining ${transactionResponse.hash}`);
  return new Promise((resolve, reject) => {
    try {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations. `
        );
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}
