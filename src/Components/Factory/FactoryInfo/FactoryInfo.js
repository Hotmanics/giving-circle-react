import "./FactoryInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";
import FactoryCard from "./FactoryCard/FactoryCard";

const FactoryInfo = (props)=> {

    const [instancesCount, setInstancesCount] = useState(0);
    const [onChainImplementation, setOnChainImplementation] = useState('');
    const [implementationField, setImplementationField] = useState('');

    const handleImplementationChanged = async (event) => {
        setImplementationField(event.target.value);
    }
    
    const setImplemenetationToChain = async () => {
        let tx = await props.factoryContract.setImplementation(implementationField);
        props.onBoastMessage("Setting implementation to: " + implementationField + "...");
        await tx.wait();
        props.onBoastMessage("Set implementation to: " + implementationField + "!");
        setOnChainImplementation(await props.factoryContract.implementation());
    }

    useEffect(()=> {


          getInfo(); 
    }, [props.onPageSet]);

    const [circleCreatorRole, setCircleCreatorRole] = useState('');

    const getInfo = async ()=> {
        
        setOnChainImplementation(await props.factoryContract.implementation());
        setInstancesCount((await props.factoryContract.instancesCount()).toNumber());

        setCircleCreatorRole(await props.factoryContract.CIRCLE_CREATOR_ROLE());
    }

    const handleAdmins = async ()=> {

        let adminRole = await props.factoryContract.DEFAULT_ADMIN_ROLE();

        let role = await props.factoryContract.CIRCLE_CREATOR_ROLE();

        try {

            let tx = await props.factoryContract.grantRole(role, indexToGive);
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

    const [finalString, setFinalString] = useState('');
    
    const getRoles = async (roleInBytes)=> {

        let ADMIN_ROLE = await props.factoryContract.DEFAULT_ADMIN_ROLE();
        let CIRCLE_CREATOR_ROLE = await props.factoryContract.CIRCLE_CREATOR_ROLE();

        let hasAdminRole = await props.factoryContract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);
        let hasCircleCreatorRole = await props.factoryContract.hasRole(CIRCLE_CREATOR_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasCircleCreatorRole) {
            currentRoles.push("Circle Creator");
        }

        let finalString = '';
        for (let i = 0; i < currentRoles.length; i++) {
            if (i === currentRoles.length - 1) {
                finalString += currentRoles[i];
            } else {
                finalString += currentRoles[i] + ", ";
            }
        }

        setFinalString(finalString);
    }

    getRoles();

    let circleCreatorAdminSection;
    let factoryAdminSection;

    if (props.currentRoles.length > 0) {
        for (let i = 0; i < props.currentRoles.length; i++) {
            if (props.currentRoles[i] === "Admin") {
                circleCreatorAdminSection = <div><p>The Circle Creator Role holds the responsibility of creating new giving circles.</p>
                <input type="text" placeholder="Wallet" onChange={handleIndexField}/>
                <button onClick={handleAdmins}>Grant: Circle Creator Role</button></div>;

                factoryAdminSection = <div>
                    <p>Please provide an updated blueprint address to be used by the Giving Cirlce Creator.</p>
                <input type="text" placeholder="Smart Contract" onChange={handleImplementationChanged}/>
                <div><button id="marginedButton" onClick={setImplemenetationToChain}>Set New Blueprint</button></div>
                </div>

                break;
            }
        }
    }

    let template = {
        title: '',
        description: '',
        value: ''
    }

    let card1 = {
        title: 'Factory Address',
        description: 'The smart contract that is used to create giving circles.',
        value: factoryAddress
    }


    let card2 = {
        title: 'Blueprint Address',
        description: 'The smart contract that is used as a blueprint by the Giving Circle Creator.',
        value: onChainImplementation
    }


    let card3 = {
        title: 'Instances Count',
        description: 'The number of Giving Circles created by the Factory.',
        value: instancesCount
    }

    return <CenteredCard className="factoryInfo" title="Factory Configuration">

        <FactoryCard info={card1}></FactoryCard>
        <FactoryCard info={card2} customRendering={factoryAdminSection}></FactoryCard>
        <FactoryCard info={card3}></FactoryCard>

        {/* <table>
            <tbody>
                <tr>
                    <th>What</th>
                    <th id="description">Description</th>
                    <th>Value</th>
                    <th></th>
                </tr>
                <tr>
                    <th>Giving Circle Creator Address</th>
                    <th>The smart contract that is used to create giving circles.</th>
                    <th>{ factoryAddress } (Smart Contract) </th>
                </tr>
                <tr>
                    <th>Blueprint Address</th>
                    <th>The smart contract that is used as a blueprint by the Factory. </th>
                    <th>{ onChainImplementation } (Smart Contract) </th>
                    <th>
                        {factoryAdminSection}
                    </th>
                </tr>
                <tr>
                    <th>Instances Count</th>
                    <th>The number of Giving Circles created by the Factory.</th>
                    <th>{ instancesCount }</th>
                </tr>

            </tbody>
        </table> */}
        {
            circleCreatorAdminSection
        }

        </CenteredCard>
}

export default FactoryInfo;
