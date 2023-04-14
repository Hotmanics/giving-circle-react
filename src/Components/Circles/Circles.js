import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../Smart Contracts Info/FactorySmartContractInfo";
import { implementationABI } from "../../Smart Contracts Info/ImplementationInfo";
import GivingCircleNavBar from "./CircleNavBar/CircleNavBar";
import GivingCirclePhases from "./GivingCirclePhases/GivingCirclePhases";
import GivingCircleInfo from "./CircleInfo/CircleInfo";
import "./Circles.css";
import CircleRolesReader from "../Circle Roles Reader/CircleRolesReader";
import CircleInfo from "./CircleInfo/CircleInfo";

const Circles = (props)=> {

    const [circles, setCircles] = useState([]);

    const [selectedInstance, setSelectedInstance] = useState('');
    const [selectedCircleName, setSelectedCircleName] = useState('');

    const [output, setOutput] = useState('');
    const [phaseSelectedTrigger, setPhaseSelectedTrigger] = useState(0);
    const [infoSelectedTrigger, setInfoSelectedTrigger] = useState(0);
    const [connectedWalletRoles, setConnectedWalletRoles] = useState([]);

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {

        getCircles();
        if (props.onGivingCirclePageSet) {
        }
    }, [props.onGivingCirclePageSet]);

    const getCircles = async ()=> {
        let x = await factoryContract.instancesCount();
        let arr = [];

        for (let i = 0; i < x; i++) {

            const instanceAddress = await factoryContract.instances(i);

            const contract = new ethers.Contract(
                instanceAddress,
                implementationABI,
                props.connectedWalletInfo.provider
            );

            arr.push({
                index: i,
                name: await contract.name(),
                contract: contract
            })
        }

        setCircles(arr);
    }

    const handleGivingCircleSelected = async (event)=> {
        const instanceAddress = await factoryContract.instances(event.target.value);

        const contract = new ethers.Contract(
            instanceAddress,
            implementationABI,
            props.connectedWalletInfo.provider
        );

        setSelectedInstance(contract);
        let name = await contract.name();

        name.length > 0 ?
            setSelectedCircleName(name):
            setSelectedCircleName(event.target.value);

        let roles = await getRoles(contract);

        setPhaseSelectedTrigger((phaseSelectedTrigger) => {
            phaseSelectedTrigger++;

            setOutput(
                <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} connectedWalletRoles={roles} onPageSet={phaseSelectedTrigger} selectedInstance={contract} onBoastMessage={props.onBoastMessage}></GivingCirclePhases>
            );
            return phaseSelectedTrigger;
        });
    }

    const handleStateSet = (state)=> {

        console.log(props.onBoastMessage);
        if (state === 'circleInfo') {
            setInfoSelectedTrigger((infoSelectedTrigger) => {
                infoSelectedTrigger++;
                setOutput(
                    <CircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={infoSelectedTrigger} selectedInstance={selectedInstance} onBoastMessage={props.onBoastMessage}></CircleInfo>
                );
                return infoSelectedTrigger;
            });
        } else if (state === 'circlePhaseActions') {
            setPhaseSelectedTrigger((phaseSelectedTrigger) => {
                phaseSelectedTrigger++;

                console.log(connectedWalletRoles);
                
                setOutput(
                    <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} connectedWalletRoles={connectedWalletRoles} onPageSet={phaseSelectedTrigger} selectedInstance={selectedInstance} onBoastMessage={props.onBoastMessage} currentRoles={connectedWalletRoles}></GivingCirclePhases>
                );
                return phaseSelectedTrigger;
            });
        }
    }

    let selectedCircleDisplayOutput;
    let selectedCircleRolesOutput;

    if (selectedCircleName !== '') {
        selectedCircleDisplayOutput = <div><h2>Circle: { selectedCircleName } </h2></div>
        selectedCircleRolesOutput = <CircleRolesReader connectedWalletInfo={props.connectedWalletInfo} circleContract={selectedInstance}></CircleRolesReader>;
    }

    let navbarOutput;
    if (selectedInstance !== '') {
        navbarOutput = <GivingCircleNavBar onStateSet={handleStateSet} connectedWalletRoles={connectedWalletRoles}></GivingCircleNavBar>;
    }

    const getRoles = async (selectedInstance)=> {

        let ADMIN_ROLE = await selectedInstance.DEFAULT_ADMIN_ROLE();
        let LEADER_ROLE = await selectedInstance.LEADER_ROLE();
        let FUNDS_MANAGER_ROLE = await selectedInstance.FUNDS_MANAGER_ROLE();
        let BEAN_PLACEMENT_ADMIN_ROLE = await selectedInstance.BEAN_PLACEMENT_ADMIN_ROLE();

        let hasAdminRole = await selectedInstance.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);
        let hasLeaderRole = await selectedInstance.hasRole(LEADER_ROLE, props.connectedWalletInfo.account);
        let hasFundsRole = await selectedInstance.hasRole(FUNDS_MANAGER_ROLE, props.connectedWalletInfo.account);
        let hasBeanPlacementRole = await selectedInstance.hasRole(BEAN_PLACEMENT_ADMIN_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasLeaderRole) {
            currentRoles.push("Circle Leader");
        }

        if (hasFundsRole) {
            currentRoles.push("Funds Manager");
        }

        if (hasBeanPlacementRole) {
            currentRoles.push("Bean Placement Manager");

        }

        setConnectedWalletRoles(currentRoles);
        return currentRoles;
    }

    return <div><CenteredCard className="circles" title="Giving Circles">
        <div>
        <select onChange={handleGivingCircleSelected} defaultValue="choose">
        <option value="choose" disabled>
         -- Select Giving Circle --
        </option>
            {
                circles.map((obj) => (
                    obj.name.length > 0 ?
                    <option key={Math.random()} value={obj.index}> {obj.name} </option> :
                    <option key={Math.random()} value={obj.index}> {obj.index} </option>
                ))
            }
        </select>  
        </div>

        </CenteredCard>
        { selectedCircleRolesOutput } 
        <CenteredCard>
        { selectedCircleDisplayOutput }
            { navbarOutput }
            { output }
        </CenteredCard>
        </div>
}

export default Circles;
