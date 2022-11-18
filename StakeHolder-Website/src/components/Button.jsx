import React from "react";
import styles from "../styles/Button.module.css";
const Button = (props) => {
  return (
    <button className={styles["button"]} onClick={props.onClick}>
      {props.context}
    </button>
  );
};
export default Button;
