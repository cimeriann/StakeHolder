import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { Fund, Withdraw } from "../utils/contractfuncs";
import { contractOwner } from "../constants/constants";
import Button from "./UI/Button";
import Input from "./UI/Input";

export const Form = (props) => {
  const owner = contractOwner;
  const [fundAmount, setFundAmount] = useState("");
  const [renderWithdraw, setRenderWithdraw] = useState(false);
  const getWalletDetails = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const obj = {
      signer: signer,
      provider: provider,
    };
    return obj;
  };
  const wallet = getWalletDetails();

  useEffect(() => {
    if (wallet.address === owner) {
      setRenderWithdraw(true);
    }
  }, [wallet.address, owner]);

  const onWithdrawClicked = async (e) => {
    try {
      await Withdraw();
    } catch (err) {
      alert(err);
    }
  };
  const onFundClicked = async (e) => {
    e.preventDefault();

    const txHash = await Fund(fundAmount);
    console.log(txHash);
    //   if (txHash.success) {
    //     console.log("success");
    //   }
  };

  return (
    <div>
      <Input
        value={fundAmount}
        onChange={(e) => {
          setFundAmount(e.target.value);
        }}
        description="Fund Amount:"
      />
      <Button
        onClick={async (e) => {
          if (props.isWalletConnected) {
            onFundClicked(e);
          } else {
            alert("You have to connect your wallet before funding!");
          }
        }}
      >
        Fund Me
      </Button>
      {wallet.signer === contractOwner ? (
        <Button
          onClick={async (e) => {
            if (props.isWalletConnected) {
              onWithdrawClicked(e);
            } else {
              alert("You have to connect your wallet");
            }                                                                       
          }}
        >
          Withdraw
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};
