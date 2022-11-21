import React, { useState, useEffect } from "react";
import ConnectWallet, { getCurrentConnectedWallet } from "./utils/connect";
import Header from "./components/Header";
import Nav from "./components/Nav";
const App = () => {
  const [walletAddress, setWallet] = useState("");
  const [status, setStatus] = useState("");
  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setWallet(accounts[0]);
          setStatus("👆🏽 Write a message in the text-field above.");
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
  };
  return (
    <div className="App">
      <Nav
        walletAddress={walletAddress}
        onConnectWallet={connectWalletClicked}
        status={status}
      />
      <Header />
    </div>
  );
};

export default App;
