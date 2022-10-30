import { ethers } from "./ethers-5.1.esm.min.jS"
import { abi } from "./constants.js"
const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");


connectButton.onclick = connectWallet;
fundButton.onclick = fund;


async function connectWallet() {
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
    connectButton.innerHTML =
      "Please install metamask";
  }
}
// fund function
async function fund(avaxAmount){
    console.log(`Funding with ${avaxAmount}`);
    if (typeof window.ethereum !== "undefined"){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = await provider.getSigner();
      // const stakeHolder 
    }
}
// withdraw fundtion
async function withdraw(){
    // hold on for now
}