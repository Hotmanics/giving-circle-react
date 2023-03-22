// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../Smart Contracts Info/FactorySmartContractInfo";
import { implementationABI } from "../../Smart Contracts Info/ImplementationInfo";
import GivingCircleNavBar from "./GivingCircleNavBar/GivingCircleNavBar";
import GivingCirclePhases from "./GivingCirclePhases/GivingCirclePhases";
import GivingCircleInfo from "./GivingCircleInfo/GivingCircleInfo";

const Circles = (props)=> {


    const [circles, setCircles] = useState([]);
    const [selectedInstance, setSelectedInstance] = useState('');


    const [phaseSelectedTrigger, setPhaseSelectedTrigger] = useState(0);
    const [infoSelectedTrigger, setInfoSelectedTrigger] = useState(0);

    useEffect(()=> {
        if (props.onGivingCirclePageSet) {
          getAllCircles();
        }
    }, [props.onGivingCirclePageSet]);


    const getAllCircles = async ()=> {
        let x = await factoryContract.instancesCount();
        let arr = [];

        for (let i = 0; i < x; i++) {
            arr.push(i);
        }
        setCircles(arr);
    }

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );
    
    const [selectedCircleIndex, setSelectedCircleIndex] = useState('');

    const handleGivingCircleSelected = async (event)=> {
        const instanceAddress = await factoryContract.instances(event.target.value);

        const contract = new ethers.Contract(
            instanceAddress,
            implementationABI,
            props.connectedWalletInfo.provider
        );

        setSelectedInstance(contract);
        setSelectedCircleIndex(event.target.value);

        setInfoSelectedTrigger((infoSelectedTrigger) => {
            infoSelectedTrigger++;
            setOutput(
                <GivingCircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={infoSelectedTrigger} selectedInstance={contract}></GivingCircleInfo>
            );
            return infoSelectedTrigger;
        });
    }

    const [output, setOutput] = useState('');
    const handleStateSet = (state)=> {
        if (state === 'circleInfo') {
            setInfoSelectedTrigger((infoSelectedTrigger) => {
                infoSelectedTrigger++;
                setOutput(
                    <GivingCircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={infoSelectedTrigger} selectedInstance={selectedInstance}></GivingCircleInfo>
                );
                return infoSelectedTrigger;
            });
        } else if (state === 'circlePhaseActions') {
            setPhaseSelectedTrigger((phaseSelectedTrigger) => {
                phaseSelectedTrigger++;
                setOutput(
                    <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} onPageSet={phaseSelectedTrigger} selectedInstance={selectedInstance}></GivingCirclePhases>
                );
                return phaseSelectedTrigger;
            });
        }
    }

    let navbarOutput;
    if (selectedInstance === '') {

    } else {
        navbarOutput = <GivingCircleNavBar onStateSet={handleStateSet}></GivingCircleNavBar>;
    }

    let selectedCircleDisplayOutput;
    if (selectedCircleIndex === '') {

    } else {
        selectedCircleDisplayOutput = <p>Selected Circle: { selectedCircleIndex } </p>
    }

    return <CenteredCard title="Giving Circle">
        <div id="aye">
            <p>Circle ID</p>
        <select onChange={handleGivingCircleSelected} defaultValue="choose">
        <option value="choose" disabled>
         -- Select Giving Circle --
        </option>
            {
                circles.map((num) => (
                    <option key={Math.random()} value={num}> {num} </option>
                ))
            }
        </select>  
        {
            selectedCircleDisplayOutput
        }
        {
            navbarOutput
        }
        {
            output
        }
        </div>

        </CenteredCard>
}

export default Circles;
