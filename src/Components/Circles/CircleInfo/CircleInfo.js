import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { ethers } from "ethers"
import { PartialIERC20InfoABI } from "../../../Smart Contracts Info/IPartialERC20Info";
import "./CircleInfo.css";
import CircleInfoNavBar from "./CircleInfoNavBar";
import CircleAttendees from "./CircleAttendees/CircleAttendees";
import CircleContributors from "./CircleContributors.js/CircleContributors";
import CircleFunds from "./CircleFunds/CircleFunds";
import CircleKYC from "./CircleKYC/CircleKYC";
import CircleGeneral from "./CircleGeneral/CircleGeneral";

const CircleInfo = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [erc20Contract, setERC20Contract] = useState();

    const getInfo = async ()=> {
        
        const instanceAddress = await props.selectedInstance.erc20Token();

        const contract = new ethers.Contract(
            instanceAddress,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        setERC20Contract(contract);
    }

    const [output, setOutput] = useState(
        <CircleGeneral connectedWalletInfo={props.connectedWalletInfo} selectedInstance={props.selectedInstance} onBoastMessage={props.onBoastMessage}></CircleGeneral>
    );

    const handleStateSet = (state) => {
        if (state === 'attendees') {
            setOutput(
                <CircleAttendees selectedInstance={props.selectedInstance}></CircleAttendees>
            );
        } else if (state === 'contributors') {
            setOutput(
                <CircleContributors selectedInstance={props.selectedInstance} erc20Contract={erc20Contract}></CircleContributors>
            );
        } else if (state === 'funds') {
            setOutput(
                <CircleFunds connectedWalletInfo={props.connectedWalletInfo} selectedInstance={props.selectedInstance} erc20Contract={erc20Contract}></CircleFunds>
            );
        } else if (state === 'kyc') {
            setOutput(
                <CircleKYC connectedWalletInfo={props.connectedWalletInfo} selectedInstance={props.selectedInstance}></CircleKYC>
            )
        } else if (state === 'general') {
            setOutput(
                <CircleGeneral connectedWalletInfo={props.connectedWalletInfo} selectedInstance={props.selectedInstance} onBoastMessage={props.onBoastMessage}></CircleGeneral>
            )
        }
    }

    return <CenteredCard className="circleInfo" title="Info">
        <CircleInfoNavBar onStateSet={handleStateSet}></CircleInfoNavBar>
        {output}
        </CenteredCard>
}

export default CircleInfo;