import { ethers } from "ethers";
import { abi } from "../constants/abi";
import { stakeHolderAddress } from "../constants/constants";

export const Fund = async (value) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  //   const accounts = await window.ethereum.request({
  // method: "eth_requestAccounts",
  //   });
  // const signer = provider.getSigner();
  const stakeHolder = new ethers.Contract(
    stakeHolderAddress,
    abi,
    provider.getSigner()
  );
  let fundAmount = ethers.utils.parseEther(value);
  stakeHolder.Fund({ fundAmount });
};
