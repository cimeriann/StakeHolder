import React from "react";
import styles from "../styles/Landing.Module.css";
import Button from "./UI/Button";
const Landing = () => {
  return (
    <div className={styles["landing"]}>
      <h1>A chance to Stake on the Avalanche Chain</h1>
      <Button className={styles["stake-btn"]}>Stake Now!!</Button>
    </div>
  );
};
export default Landing;
