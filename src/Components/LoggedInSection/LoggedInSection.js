import NavBar from "../NavBar/NavBar";
import React, { useState, useEffect } from 'react';
import Circles from "../Circles/Circles";
import FactoryNavBar from "../Factory/FactoryNavBar/FactoryNavBar";
import RolesReader from "../Roles Reader/RolesReader";

const LoggedInSection = (props)=> {

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [givingCircleTrigger, setGivingCircleTrigger] = useState(0);

    const [output, setOutput] = useState();

    const handleStateSet = (state)=> {
        if (state === 'givingCirclesFactory') {
            setOutput(
                <div>
                    <FactoryNavBar connectedWalletInfo={props.connectedWalletInfo} factoryContract={props.factoryContract} onBoastMessage={handleLogger} ></FactoryNavBar>
                </div>
            )
        }
        else if (state === "givingCircle") {
            setGivingCircleTrigger((givingCircleTrigger) => {
                givingCircleTrigger = givingCircleTrigger + 1;
                setOutput(
                <Circles 
                    onBoastMessage={handleLogger}
                    onGivingCirclePageSet={givingCircleTrigger} 
                    connectedWalletInfo={props.connectedWalletInfo}
                ></Circles>);
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