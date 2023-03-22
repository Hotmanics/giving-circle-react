import "./LoggedInSection.css";
import NavBar from "../NavBar/NavBar";
import React, { useState } from 'react';
import GeneralContractInfo from "../GeneralContractInfo/GeneralContractInfo";
import GivingCircleFactory from "../GivingCircleFactory/GivingCircleFactory";
import GivingCircle from "../GivingCircle/GivingCircle";

const LoggedInSection = (props)=> {

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [contractInfoTrigger, setContractInfoTrigger] = useState(0);
    const [givingCircleTrigger, setGivingCircleTrigger] = useState(0);

    const [output, setOutput] = useState(<p>Welcome!</p>);

    const handleStateSet = (state)=> {

        // if (state === 'mint') {
        //     setOutput(<Minting onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Minting>);

        // } else if (state === 'distribute') {
        //     setOutput(<Distributing onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Distributing>);
      
        // } else if (state === 'roleGrant') {
        //     setOutput(<GrantRoles onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></GrantRoles>);
        // } 
        if (state === 'contractInfo') {
            setContractInfoTrigger((contractInfoTrigger) => {
                contractInfoTrigger = contractInfoTrigger + 1;
                setOutput(<GeneralContractInfo onBoastMessage={handleLogger} onContractPageSet={contractInfoTrigger} connectedWalletInfo={props.connectedWalletInfo}></GeneralContractInfo>);
            });
        }
        else if (state === 'givingCircleFactory') {
            setOutput(<GivingCircleFactory onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></GivingCircleFactory>);
        }
        else if (state === "givingCircle") {
            setGivingCircleTrigger((givingCircleTrigger) => {
                givingCircleTrigger = givingCircleTrigger + 1;
                setOutput(<GivingCircle onBoastMessage={handleLogger} onGivingCirclePageSet={givingCircleTrigger} connectedWalletInfo={props.connectedWalletInfo}></GivingCircle>);
            });
        }
        // } else if (state === 'balance') {
        //     setOutput(<Balance onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></Balance>);
        // } else if (state === 'SXSW') {
        //     setOutput(<SXSW onBoastMessage={handleLogger} connectedWalletInfo={props.connectedWalletInfo}></SXSW>);
        // }
    }

    return <div className="LoggedInSection">
    <NavBar onStateSet={handleStateSet}></NavBar>
    { output }
    </div>
}

export default LoggedInSection;