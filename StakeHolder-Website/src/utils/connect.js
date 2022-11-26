export const ConnectWallet = async () => {
  if (window.ethereum) {
    try {
      const addresses = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj = {
        status: "👇🏽 Please proceed to fund smart contract",
        address: addresses[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      address: "",
      status: (
        <span>
          <p>
            {" "}
            😿{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You must install Metamask, a virtual Ethereum wallet, in your
              browser.
            </a>
          </p>
        </span>
      ),
    };
  }
};

export const getCurrentConnectedWallet = async () => {
  if (window.ethereum) {
    try {
      const addresses = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addresses.length > 0) {
        return {
          address: addresses[0],
          status: "👇🏽 Please proceed to fund smart contract.",
        };
      } else {
        return {
          address: "",
          status: "🦊 Connect to Metamask using the top right button",
        };
      }
    } catch (err) {
      return {
        address: "",
        status: err.message,
      };
    }
  } else {
    return {
      status: (
        <span>
          <p>
            {" "}
            😿{" "}
            <a
              target="_blank"
              href={`https://metamask.io/download.html`}
              rel="noreferrer"
            >
              You need to install Metamask, a virtual Ethereum wallet, in your
              browser in order to proceed.
            </a>
          </p>
        </span>
      ),
      address: "",
    };
  }
};
export default ConnectWallet;
