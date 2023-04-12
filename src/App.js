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

function App() {

  useEffect(() => {
    document.title = "Giving Circles"
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

    setLoginComponents(
      info.provider === undefined ?
        <div></div> : 
        <LoggedInSection 
          onBoastMessage={handleLogger} 
          connectedWalletInfo={info}
          factoryContract={factoryContract}
          onFactorySpecificTrigger={handleFactorySpecificTrigger}
        ></LoggedInSection>
        );
  }

  const handleLogger = (message)=> {
    setMessage(message);
  }

  const [loginComponents, setLoginComponents] = useState('');

  const [rolesOutput, setRolesOutput] = useState();

  const [factoryPageSet, setFactoryPageSet] = useState(0);

  const handleFactorySpecificTrigger = (factoryContract) => {

    console.log(factoryContract);  

    setFactoryPageSet((factoryPageSet) => {
      factoryPageSet = factoryPageSet + 1;
    })


  }


  // if (factoryContract !== undefined) {
  //   console.log("RUNNING")
  //   setRolesOutput(
  //     <div id="test">  
  //     <RolesReader connectedWalletInfo={connectedWalletInfo} factoryContract={factoryContract} onFactoryPageSet={factoryPageSet}></RolesReader>
  //     </div>
  //   );
  // }


  let output = <div>

    <div id="topContainer">
  <div id="test">
    <ConnectWallet onBoastMessage={handleLogger} onWalletConnected={handleLogin}></ConnectWallet>
    </div>
  <div id="test">  
  <Logger boastMessage={message} connectedWalletInfo={connectedWalletInfo}></Logger>
  </div>
 {
  rolesOutput
 }

  </div>

  {loginComponents}
  </div>;

  return (
    <div className="App">
      <header className="App-header">
        { output }
      </header>
    </div>
  );
}

export default App;