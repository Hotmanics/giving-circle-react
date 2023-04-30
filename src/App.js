import React, {useState, useEffect} from 'react';
import "./App.css";
import ConnectWallet from "./Components/ConnectWallet/ConnectWallet";
import Logger from "./Components/Logger/Logger";
import "./Components/Buttons/buttons.css";
import LoggedInSection from "./Components/LoggedInSection/LoggedInSection";
import "./Components/Table/Table.css";
import "./Components/Inline/Inline.css";
import { factoryAddress, factoryABI } from "./Smart Contracts Info/FactorySmartContractInfo";
import { ethers } from "ethers"
import RolesReader from "./Components/Roles Reader/RolesReader";
import About from './Components/About/About';

function App() {

  useEffect(() => {
    document.title = "Giving Circles - ATX DAO"
    }, []);

  const [connectedWalletInfo, setConnectedWalletInfo] = useState('');
  const [factoryContract, setFactoryContract] = useState();
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

  const handleLogger = (message)=> {
    setMessage(message);
  }

  const [rolesOutput, setRolesOutput] = useState();

  let loginComponents;
  if (connectedWalletInfo.provider !== undefined) {
    loginComponents = <LoggedInSection 
    onBoastMessage={handleLogger} 
    connectedWalletInfo={connectedWalletInfo}
    factoryContract={factoryContract}
  ></LoggedInSection>
  } else {
    loginComponents = <About></About>
  }

  let output = <div>
    <ConnectWallet onBoastMessage={handleLogger} onWalletConnected={handleLogin}></ConnectWallet>
    <Logger boastMessage={message} connectedWalletInfo={connectedWalletInfo}></Logger>
    { rolesOutput }
    {loginComponents}
  </div>;

  return (
    <div className='app'>
      <header>
        { output }
      </header>
    </div>
  );
}

export default App;