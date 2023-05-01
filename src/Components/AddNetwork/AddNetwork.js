import React, { useState } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"
import "./AddNetwork.css";

const AddNetwork = (props)=> {

    const handleClick = ()=> {
        window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [{
              chainId: "0x13881",
              rpcUrls: ["https://endpoints.omniatech.io/v1/matic/mumbai/public"],
              chainName: "Mumbai",
              nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
              },
              blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
            }]
          });
    }

    return <div className="addNetwork">
            <div>
                <div>Please ensure that your MetaMask is connected to Mumbai!</div>
                <button onClick={handleClick}>Add Mumbai To MetaMask</button>
            </div>
        </div>
}

export default AddNetwork;