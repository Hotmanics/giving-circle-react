import React, { useState } from 'react';
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import CoinbaseWalletSDK from "@coinbase/wallet-sdk";
import { ethers } from "ethers"
import "./Lost.css";

const Lost = (props)=> {
    return <div className="lost">
            <div>Lost? Please follow this tutorial to install Metamask: </div>
            <a href="https://www.geeksforgeeks.org/how-to-install-and-use-metamask-on-google-chrome/" target={"#"}>Tutorial</a>
        </div>
}

export default Lost;