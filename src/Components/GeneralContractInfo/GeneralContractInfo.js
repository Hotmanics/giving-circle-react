// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";

const GeneralContractInfo = (props)=> {

    const [instancesCount, setInstancesCount] = useState(0);
    const [implementation, setImplementation] = useState('');

    const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {

        console.log("was set");
        if (props.onContractPageSet) {
          getInfo();  
        }
    }, [props.onContractPageSet]);

    const getInfo = async ()=> {
        setImplementation(await contract.implementation());
        setInstancesCount((await contract.instancesCount()).toNumber());
    }

    return <CenteredCard title="Contract Info">
        <p>Factory Address: { factoryAddress }</p>
        <p>Implementation Address: { implementation }</p>
        <p>Instances Count: { instancesCount } </p>
        </CenteredCard>
}

export default GeneralContractInfo;
