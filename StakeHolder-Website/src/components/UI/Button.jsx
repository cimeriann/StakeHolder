import React from "react";
import "../../styles/ButtonUI.css";
const Button = (props) => {
  return (
    <button
      className={"ui-button" || props.className}
      onClick={props.onClick}
      type={props.type || "submit"}
    >
      {props.children}
    </button>
  );
};
export default Button;
