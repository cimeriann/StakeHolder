import React from "react";
// import { ethers } from "ethers";
import ConnectWallet from "../utils/connect";
import Button from "./Button";
import styles from "../styles/Nav.module.css";
import { Link } from "react-router-dom";
// import { ContractFuncs } from "./ContractFuncs";

const NavBar = () => {
  return (
    <nav className={styles["nav"]}>
      <div>
        {/* <Link>StakeHolder</Link> */}
        <p className={styles["logo"]}>
          <a href="www.google.com"> StakeHolder</a>
        </p>
        <Button onClick={ConnectWallet} context="Connect To Metamask" />
      </div>
    </nav>
  );
};

export default NavBar;
