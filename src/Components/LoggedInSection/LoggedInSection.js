import "./LoggedInSection.css";
import NavBar from "../NavBar/NavBar";
import React, { useState } from 'react';
import GivingCircle from "../GivingCircle/GivingCircle";
import FactoryInfo from "../FactoryInfo/FactoryInfo";
import FactoryInteractions from "../FactoryInteractions/FactoryInteractions";

const LoggedInSection = (props)=> {

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [factoryInfoTrigger, setContractInfoTrigger] = useState(0);
    const [givingCircleTrigger, setGivingCircleTrigger] = useState(0);

    const [output, setOutput] = useState(<p>Welcome!</p>);

    const handleStateSet = (state)=> {
        if (state === 'factoryInfo') {
            setContractInfoTrigger((factoryInfoTrigger) => {
                factoryInfoTrigger = factoryInfoTrigger + 1;
                setOutput(<FactoryInfo onBoastMessage={handleLogger} onPageSet={factoryInfoTrigger} connectedWalletInfo={props.connectedWalletInfo}></FactoryInfo>);
                return factoryInfoTrigger;
            });
        }
        else if (state === 'factoryInteractions') {
            setOutput(<FactoryInteractions onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></FactoryInteractions>);
        }
        else if (state === "givingCircle") {
            setGivingCircleTrigger((givingCircleTrigger) => {
                givingCircleTrigger = givingCircleTrigger + 1;
                setOutput(<GivingCircle onBoastMessage={handleLogger} onGivingCirclePageSet={givingCircleTrigger} connectedWalletInfo={props.connectedWalletInfo}></GivingCircle>);
                return givingCircleTrigger;
            });
        }
    }

    return <div className="LoggedInSection">
    <NavBar onStateSet={handleStateSet}></NavBar>
    { output }
    </div>
}

export default LoggedInSection;