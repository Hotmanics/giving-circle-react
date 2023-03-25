import "./FactoryInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";

const FactoryInfo = (props)=> {

    const [instancesCount, setInstancesCount] = useState(0);
    const [onChainImplementation, setOnChainImplementation] = useState('');
    const [implementationField, setImplementationField] = useState('');

    const handleImplementationChanged = async (event) => {
        setImplementationField(event.target.value);
    }
    const setImplemenetationToChain = async () => {
        let tx = await contract.setImplementation(implementationField);
        props.onBoastMessage("Setting implementation to: " + implementationField + "...");
        await tx.wait();
        props.onBoastMessage("Set implementation to: " + implementationField + "!");
        setOnChainImplementation(await contract.implementation());
    }

    //0xA7562f745D9cdc25fda21909E9C99630CC5D83AF

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
        setOnChainImplementation(await contract.implementation());
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
                    <th>{ onChainImplementation }</th>
                    <th>
                        <input type="text" onChange={handleImplementationChanged}/>
                        <div><button id="marginedButton" onClick={setImplemenetationToChain}>Set</button></div>
                    </th>
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
