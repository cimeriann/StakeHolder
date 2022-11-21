import { ethers } from "ethers";
import { abi } from "../constants/abi";
import { stakeHolderAddress } from "../constants/constants";

export const Fund = async () => {
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
  let value = ethers.utils.parseEther("0.1");
  stakeHolder.Fund({ value });
};

export default Fund;
