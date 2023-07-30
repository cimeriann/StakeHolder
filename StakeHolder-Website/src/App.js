import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ConnectWallet, { getCurrentConnectedWallet } from "./utils/connect";
import Landing from "./components/Dashboard/Landing";
import Nav from "./components/Nav";
import { Form } from "./components/Dashboard/Form";
import { AddDelegator } from "./components/extras/AddDelegator";
// import { Fund } from "./utils/contractfuncs";

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

  const connectWalletClicked = async (event) => {
    event.preventDefault();
    const walletResponse = await ConnectWallet();
    setStatus(walletResponse.status);
    setWallet(walletResponse.address);
    if (walletResponse.address > 0) {
      setWalletConnected(true);
    }
  };
  return (
    <Router>
      <div className="App">
        <Nav
          walletAddress={walletAddress}
          onConnectWallet={connectWalletClicked}
          status={status}
        />

        <Routes>
          <Route exact path="/" element={<Landing />}></Route>
          <Route exact path="/add-delegator" element={""}></Route>
          <Route
            exact
            path="/fund"
            element={
              <Form isWalletConnected={walletConnected} status={status} />
            }
          ></Route>
          <Route exact path="/add-delegator" element={<AddDelegator />}></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
