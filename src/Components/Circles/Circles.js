import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../Smart Contracts Info/FactorySmartContractInfo";
import { implementationABI } from "../../Smart Contracts Info/ImplementationInfo";
import GivingCircleNavBar from "./CircleNavBar/CircleNavBar";
import GivingCirclePhases from "./GivingCirclePhases/GivingCirclePhases";
import GivingCircleInfo from "./CircleInfo/CircleInfo";
import "./Circles.css";

const Circles = (props)=> {

    const [circlesComplete, setCirclesComplete] = useState([]);

    const [selectedInstance, setSelectedInstance] = useState('');
    const [selectedCircleIndex, setSelectedCircleIndex] = useState('');
    const [selectedCircleName, setSelectedCircleName] = useState('');

    const [output, setOutput] = useState('');
    const [phaseSelectedTrigger, setPhaseSelectedTrigger] = useState(0);
    const [infoSelectedTrigger, setInfoSelectedTrigger] = useState(0);

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    useEffect(()=> {
        if (props.onGivingCirclePageSet) {
          getAllCircles();
        }
    }, [props.onGivingCirclePageSet]);

    const getAllCircles = async ()=> {
        let x = await factoryContract.instancesCount();
        let arr = [];
        let arrComplete = [];

        for (let i = 0; i < x; i++) {

            const instanceAddress = await factoryContract.instances(i);

            const contract = new ethers.Contract(
                instanceAddress,
                implementationABI,
                props.connectedWalletInfo.provider
            );

            arrComplete.push({
                index: i,
                name: await contract.name(),
                contract: contract
            })
        }

        setCirclesComplete(arrComplete);

        console.log(arrComplete);
        console.log("Got all circles!");
    }

    const handleGivingCircleSelected = async (event)=> {

        console.log(event.target.value);
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

        setSelectedCircleIndex(event.target.value);

        setInfoSelectedTrigger((infoSelectedTrigger) => {
            infoSelectedTrigger++;
            setOutput(
                <GivingCircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={infoSelectedTrigger} selectedInstance={contract} onBoastMessage={props.onBoastMessage}></GivingCircleInfo>
            );
            return infoSelectedTrigger;
        });
    }

    const handleStateSet = (state)=> {
        if (state === 'circleInfo') {
            setInfoSelectedTrigger((infoSelectedTrigger) => {
                infoSelectedTrigger++;
                setOutput(
                    <GivingCircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={infoSelectedTrigger} selectedInstance={selectedInstance} onBoastMessage={props.onBoastMessage}></GivingCircleInfo>
                );
                return infoSelectedTrigger;
            });
        } else if (state === 'circlePhaseActions') {
            setPhaseSelectedTrigger((phaseSelectedTrigger) => {
                phaseSelectedTrigger++;
                setOutput(
                    <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} onPageSet={phaseSelectedTrigger} selectedInstance={selectedInstance} onBoastMessage={props.onBoastMessage}></GivingCirclePhases>
                );
                return phaseSelectedTrigger;
            });
        }
    }

    let selectedCircleDisplayOutput;
    if (selectedCircleName !== '') {
        selectedCircleDisplayOutput = <h2>Circle: { selectedCircleName } </h2>
    }

    let navbarOutput;
    if (selectedInstance !== '') {
        navbarOutput = <GivingCircleNavBar onStateSet={handleStateSet}></GivingCircleNavBar>;
    } 

    return <CenteredCard className="circles" title="Giving Circles">
        <div>
        <select onChange={handleGivingCircleSelected} defaultValue="choose">
        <option value="choose" disabled>
         -- Select Giving Circle --
        </option>
            {
                circlesComplete.map((obj) => (
                    obj.name.length > 0 ?
                    <option key={Math.random()} value={obj.index}> {obj.name} </option> :
                    <option key={Math.random()} value={obj.index}> {obj.index} </option>
                ))
            }
        </select>  
        { selectedCircleDisplayOutput }
        { navbarOutput }
        { output }
        </div>

        </CenteredCard>
}

export default Circles;
