import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ConnectWallet, { getCurrentConnectedWallet } from "./utils/connect";
import Landing from "./components/Landing";
import Nav from "./components/Nav";
import { FundContract } from "./components/FundContract";
import { AddDelegator } from "./components/AddDelegator";
import { Fund } from "./utils/contractfuncs";

const App = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const [walletConnected, setWalletConnected] = useState(false);
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👇🏽 Please proceed to fund smart contract");
        } else {
          setWallet("");
          setStatus("🦊 Connect to Metamask using the top right button.");
        }
      });
    } else {
      setStatus(
        <p>
          {" "}
          🦊{" "}
          <a
            target="_blank"
            href={`https://metamask.io/download.html`}
            rel="noreferrer"
          >
            You must install Metamask, a virtual Ethereum wallet, in your
            browser.
          </a>
        </p>
      );
    }
  };
  useEffect(() => {
    const getWalletInfo = async () => {
      const { address, status } = await getCurrentConnectedWallet();
      setWallet(address);
      setStatus(status);
    };
    getWalletInfo();
    addWalletListener();
  }, []);

  const fundButtonClicked = async (value) => {
    await Fund(value);
  };

  const connectWalletClicked = async (event) => {
    event.preventDefault();
    const walletResponse = await ConnectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    setWalletConnected(true);
  };
  return (
    <Router>
      <div className="App">
        <Nav
          walletAddress={walletAddress}
          onConnectWallet={connectWalletClicked}
          status={status}
        />
        <Link to="/">Home</Link>

        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route
            exact
            path="/fund"
            element={
              walletConnected ? (
                <FundContract onFundButtonClicked={fundButtonClicked} />
              ) : (
                "Please connect your metamask wallet using the button above"
              )
            }
          ></Route>
          <Route exact path="/add-delegator" element={<AddDelegator />}></Route>
        </Routes>
        <Link to="/fund">Fund Now!!</Link>
      </div>
    </Router>
  );
};

export default App;
