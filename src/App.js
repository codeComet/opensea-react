import "./App.css";
import MetaMaskOnboarding from "@metamask/onboarding";
import { useState } from "react";
import axios from "axios";

function App() {
  const { ethereum } = window;
  const forwarderOrigin = "http://localhost:3000";
  const onboarding = new MetaMaskOnboarding({ forwarderOrigin });
  const [account, setAccount] = useState("");
  const [message, setMessage] = useState("");

  const isMetamaskInstalled = () => {
    return Boolean(ethereum && ethereum.isMetaMask);
  };
  console.log(isMetamaskInstalled());

  const metaMaskClientCheck = async () => {
    if (!isMetamaskInstalled()) {
      setMessage("please connect metamask");
      await onboarding.startOnboarding();
      setMessage("metamask connected");
    } else {
      await ethereum.request({ method: "eth_requestAccounts" });
      setMessage("metamask already installed, click get account");
    }
  };

  const onClickConnect = async () => {
    try {
      let acc = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(acc[0]);
    } catch (error) {
      console.error(error);
    }
  };

  const getAssets = async (address) => {
    try {
      await axios
        .get(
          `https://api.opensea.io/api/v1/assets?owner=0xef764bac8a438e7e498c2e5fccf0f174c3e3f8db`
        )
        .then((res) => {
          console.log(res.data);
        });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="App">
      <button onClick={metaMaskClientCheck}>Connect</button>
      <button onClick={onClickConnect}>Get account</button>
      <button onClick={() => getAssets(account)}>Get assets</button>
      <p>{message}</p>
      <p>{account}</p>
    </div>
  );
}

export default App;
