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

    const [circleCreatorRole, setCircleCreatorRole] = useState('');

    const getInfo = async ()=> {
        
        setOnChainImplementation(await contract.implementation());
        setInstancesCount((await contract.instancesCount()).toNumber());

        setCircleCreatorRole(await contract.CIRCLE_CREATOR_ROLE());
    }

    const handleAdmins = async ()=> {

        let adminRole = await contract.DEFAULT_ADMIN_ROLE();

        let role = await contract.CIRCLE_CREATOR_ROLE();

        try {

            let tx = await contract.grantRole(role, indexToGive);
            console.log(`granting circle creator role to: ${indexToGive}`);
            props.onBoastMessage(`granting circle creator role to: ${indexToGive}...`);
            await tx.wait();
            props.onBoastMessage(`granted circle creator role to: ${indexToGive}!`);
        } catch (e) {
            if (e.reason === `execution reverted: AccessControl: account ${props.connectedWalletInfo.account.toLowerCase()} is missing role ${adminRole}`) {
                props.onBoastMessage(`${props.connectedWalletInfo.account} does not have the power to grant the circle creator role!`);
            } else {
                props.onBoastMessage(e.reason);
            }
        }
    }

    const [indexToGive, setIndexToGive] = useState(0);

    const handleIndexField = (event)=> {
        setIndexToGive(event.target.value);
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

        <input type="text" onChange={handleIndexField}/>
        <button onClick={handleAdmins}>Grant Circle Creator Role</button>

        </CenteredCard>
}

export default FactoryInfo;
