import logo from "./logo.svg";
import "./App.css";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"

const providerOptions = {
  walletconnect: {
    package: WalletConnectProvider, // required
    options: {
      infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // required
    },
  },
  coinbasewallet: {
    package: CoinbaseWalletSDK, // Required
    options: {
      appName: "web3modal", // Required
      infuraId: "https://mainnet.infura.io/v3/cadcede23805433d8a998682be5bc221", // Required
      rpc: "", // Optional if `infuraId` is provided; otherwise it's required
      chainId: 1, // Optional. It defaults to 1 if not provided
      darkMode: false, // Optional. Use dark theme, defaults to false
    },
  },
  binancechainwallet: {
    package: true,
  },
};

const web3Modal = new Web3Modal({
  network: "mainnet", // optional
  cacheProvider: false, // optional
  displayNoInjectedProvider: false,
  disableInjectedProvider: false,
  providerOptions, // required
});

let signer;

const connectWallet = async () => {

    //keep for dev purposes - if not present then app will remember Metamask and not display the modal
    web3Modal.clearCachedProvider()

    const provider = await web3Modal.connect();
    const etherProvider = new ethers.providers.Web3Provider(provider);

    await etherProvider.send("eth_requestAccounts");
    const accounts = await etherProvider.listAccounts();
    const account = accounts[0];
    document.querySelector(".connectedAccount").innerHTML = "Connected Account: " + account;

    let network = await etherProvider.getNetwork();
    document.querySelector(".networkName").innerHTML = "Network Name: " + network.name;
    document.querySelector(".networkId").innerHTML = "Network ID: " + network.chainId;
    

    
    signer = etherProvider.getSigner();
};


const sendTransaction = async () => {
    const tx = await signer.sendTransaction({
      to: "0xB077603E82C8683B53470197ffB952938Ba09aD9",
      value: ethers.utils.parseEther("0.1")
  });

  document.querySelector(".txHash").innerHTML = "TX Hash: " + tx.hash;

  console.log(tx);
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Web3 Modal</p>
        <button type="button" className="btn btn-primary connect" onClick={connectWallet}>
          Connect Wallet
        </button>
        <p className="connectedAccount"></p>
        <p className="networkName"></p>
        <p className="networkId"></p>

        <button type="button" className="btn btn-primary sendTransaction" onClick={sendTransaction}>
          Send Transaction
        </button>

        <p className="txHash"></p>

      </header>
    </div>
  );
}

export default App;