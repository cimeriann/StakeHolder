import React from "react";
import Button from "./Button";
export const FundContract = (props) => {
  return (
    <div>
      <input className="fundField" type="text" placeholder="in nAvax"></input>
      <label>Fund Amount:</label>
      <Button
        onClick={(e) => {
          props.onFundButtonClicked(e);
        }}
      >
        <p>Fund Me</p>
      </Button>
    </div>
  );
};
