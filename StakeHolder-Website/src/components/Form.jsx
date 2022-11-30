import React, { useState } from "react";
import { Fund, Withdraw } from "../utils/contractfuncs";
import Button from "./UI/Button";
import Input from "./UI/Input";
export const Form = (props) => {
  const [fundAmount, setFundAmount] = useState("");
  // useEffect(() => {
  //   setFundAmount(_fundAmount);
  // });
  // let _fundAmount;
  // const handleChange = ;
  const resetFundAmount = () => {
    setFundAmount("");
  };
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
    if (txHash.success) {
      resetFundAmount();
      console.log("success");
    }
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
      <Button
        onClick={async (e) => {
          if (props.isWalletConnected) {
            onWithdrawClicked(e);
          } else {
            alert("You have to connect your wallet");
          }
        }}
      ></Button>
    </div>
  );
};
