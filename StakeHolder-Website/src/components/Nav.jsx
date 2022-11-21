import React from "react";
import Button from "./Button";
import styles from "../styles/Nav.module.css";

const Nav = (props) => {
  return (
    <nav className={styles["nav"]}>
      <div>
        <p className={styles["logo"]}>
          <a href="/">
            {" "}
            <h1>StakeHolder</h1>
          </a>
        </p>
        <Button
          className={styles["button"]}
          onClick={(e) => props.onConnectWallet(e)}
        >
          {props.walletAddress.length > 0 ? (
            <p>
              {"Connected: " +
                String(props.walletAddress).substring(0, 6) +
                "..." +
                String(props.walletAddress).substring(38)}
            </p>
          ) : (
            <>
              <p>Connect To Metamask</p>
            </>
          )}
        </Button>
        <p>{props.walletAddress > 0 ? props.status : ""}</p>
      </div>
    </nav>
  );
};
export default Nav;
