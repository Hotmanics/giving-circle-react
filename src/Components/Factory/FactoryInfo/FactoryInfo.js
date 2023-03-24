// import "./FactoryInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";

const FactoryInfo = (props)=> {

    const [instancesCount, setInstancesCount] = useState(0);
    const [implementation, setImplementation] = useState('');

    const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();  
        }
    }, [props.onPageSet]);

    const getInfo = async ()=> {
        setImplementation(await contract.implementation());
        setInstancesCount((await contract.instancesCount()).toNumber());
    }

    return <CenteredCard title="Factory Info">
        <table>
            <tbody>
                <tr>
                    <th>Address</th>
                    <th>{ factoryAddress }</th>
                </tr>
                <tr>
                    <th>Implementation Address</th>
                    <th>{ implementation }</th>
                </tr>
                <tr>
                    <th>Instances Count</th>
                    <th>{ instancesCount }</th>
                </tr>

            </tbody>
        </table>
        </CenteredCard>
}

export default FactoryInfo;
