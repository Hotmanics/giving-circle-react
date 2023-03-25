import NavBar from "../NavBar/NavBar";
import React, { useState } from 'react';

import FactoryInfo from "../Factory/FactoryInfo/FactoryInfo";
import FactoryInteractions from "../Factory/FactoryInteractions/FactoryInteractions";
import Circles from "../Circles/Circles";

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
                setOutput(<Circles onBoastMessage={handleLogger} onGivingCirclePageSet={givingCircleTrigger} connectedWalletInfo={props.connectedWalletInfo}></Circles>);
                return givingCircleTrigger;
            });
        }
    }

    return <div>
    <NavBar onStateSet={handleStateSet}></NavBar>
    { output }
    </div>
}

export default LoggedInSection;