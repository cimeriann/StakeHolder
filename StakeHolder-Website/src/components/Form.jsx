import React, { useState } from "react";
import { Fund } from "../utils/contractfuncs";
import Button from "./UI/Button";
import Input from "./UI/Input";
export const Form = (props) => {
  const [fundAmount, setFundAmount] = useState("");
  const handleChange = (e) => {
    setFundAmount(e.target.value);
  };
  if (props.isWalletConnected) {
    return (
      <div>
        <Input
          value={fundAmount}
          onChange={handleChange}
          description="Fund Amount:"
        />
        <Button onClick={Fund(fundAmount)}>Fund Me</Button>
      </div>
    );
  } else {
    return <div>{props.status}</div>;
  }
};
