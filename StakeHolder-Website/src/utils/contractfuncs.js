import { ethers } from "ethers";
// import BN from "bn.js";
import { abi } from "../constants/abi";
import { stakeHolderAddress } from "../constants/constants";

export const Fund = async (value) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await window.ethereum.request({
  // method: "eth_requestAccounts",
  //   });
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const stakeHolder = new ethers.Contract(stakeHolderAddress, abi, signer);
  let fundAmount = ethers.utils.parseEther(value);

  try {
    const txHash = await stakeHolder.fund({ value: fundAmount });
    await listenForTransactionMine(txHash, provider);
  } catch (err) {
    return err;
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
