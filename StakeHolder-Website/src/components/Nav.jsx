import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import styles from "../styles/Nav.module.css";

const Nav = (props) => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleToggle = () => {
    setNavbarOpen((prev) => !prev);
  };
  return (
    <nav className={styles["nav"]}>
      <div className={`links ${navbarOpen ? "showMenu" : ""}`}>
        <Link to="/" className={styles["logo"]}>
          <img src={"#"} alt="StakeHolder" />
        </Link>

        <button onClick={handleToggle}>{navbarOpen ? "Closed" : "Open"}</button>
        <p>{props.walletAddress > 0 ? props.status : ""}</p>
      </div>
      <div
        className={`${styles["button"]} ${
          navbarOpen ? styles["nav-slide"] : ""
        }`}
      >
        {" "}
        <Button
          className={styles["button"]}
          onClick={(e) => props.onConnectWallet(e)}
        >
          {props.walletAddress.length > 0 ? (
            <p>
              {"🦊 Connected: " +
                String(props.walletAddress).substring(0, 6) +
                "..." +
                String(props.walletAddress).substring(38)}
            </p>
          ) : (
            <>
              <p>🦊 Connect To Metamask</p>
            </>
          )}
        </Button>
      </div>
      <div className={styles["burger"]}>
        {navbarOpen ? (
          <i
            className="fas fas-times"
            onClick={() => {
              setNavbarOpen((prev) => !prev);
            }}
          />
        ) : (
          <i
            className="fas fas-bars"
            onClick={() => {
              setNavbarOpen((prev) => !prev);
            }}
          />
        )}
      </div>
    </nav>
  );
};
export default Nav;
