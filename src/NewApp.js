import "./App.css";
import React, { useState, useEffect } from 'react';
import "./Components/Buttons/buttons.css";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet";
import Logger from "./Components/Logger/Logger";
import LoggedInSection from "./Components/LoggedInSection/LoggedInSection";
import About from "./Components/About/About";
import { factoryAddress, factoryABI } from "./Smart Contracts Info/FactorySmartContractInfo";
import { ethers } from "ethers"

function App() {

  useEffect(() => {
    document.title = "Giving Circles - ATX DAO"
    }, []);

  const [connectedWalletInfo, setConnectedWalletInfo] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = (info)=> {
    setConnectedWalletInfo(info);
    
    const factoryContract = new ethers.Contract(
      factoryAddress,
      factoryABI,
      info.provider
    );        
    setFactoryContract(factoryContract);

  }

  const [factoryContract, setFactoryContract] = useState();


  const handleLogger = (message)=> {
    setMessage(message);
  }

  let loginComponents;
  if (connectedWalletInfo.provider === undefined) {
    loginComponents = <About></About>;
  } else {
    loginComponents = <LoggedInSection 
    onBoastMessage={handleLogger} 
    connectedWalletInfo={connectedWalletInfo}
    factoryContract={factoryContract}
    ></LoggedInSection>
  }
  
  let output = <div>
  <ConnectWallet onBoastMessage={handleLogger} onWalletConnected={handleLogin}></ConnectWallet>
  <Logger boastMessage={message} connectedWalletInfo={connectedWalletInfo}></Logger>
  {loginComponents}</div>;

  return (
    <div className="app">
      <header>
        {output}
      </header>
    </div>
  );
}

export default App;