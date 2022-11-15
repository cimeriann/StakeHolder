import { ethers } from "./ethers-5.1.esm.min.jS";
import { abi, stakeHolderAddress } from "./constants.js";
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");

connectButton.onclick = connect;
fundButton.onclick = fund;

async function connect() {
  if (typeof window.ethereum !== "undefined") {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" });
    } catch (error) {
      console.log(error);
    }
    connectButton.innerHTML = "Connected!";
    const accounts = await ethereum.request({ method: "eth_accounts" });
    console.log(accounts);
  } else {
    connectButton.innerHTML = "Please install metamask";
  }
}
// fund function
async function fund() {
  let avaxAmount = "0.06";
  console.log(`Funding with ${avaxAmount}`);
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = await provider.getSigner();
    const stakeHolder = new ethers.Contract(stakeHolderAddress, abi, signer);
    const transactionResponse = await stakeHolder.fund({
      value: ethers.utils.parseEther(avaxAmount),
    });
    console.log(await transactionResponse);
  }
}
// withdraw fundtion
async function withdraw() {
  // hold on for now
}
