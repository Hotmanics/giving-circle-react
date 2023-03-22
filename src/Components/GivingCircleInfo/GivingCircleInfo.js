// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";
import { implementationABI } from "../../ImplementationInfo";
import GivingCircleNavBar from "../GivingCircleNavBar/GivingCircleNavBar";

const GivingCircleInfo = (props)=> {

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    return <CenteredCard title="Circle Info">
        <p>Hello</p>
        </CenteredCard>
}

export default GivingCircleInfo;
