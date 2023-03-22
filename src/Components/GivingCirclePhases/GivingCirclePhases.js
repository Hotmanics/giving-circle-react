// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";
import { implementationABI } from "../../ImplementationInfo";
import GivingCircleNavBar from "../GivingCircleNavBar/GivingCircleNavBar";

const GivingCirclePhases = (props)=> {

    useEffect(()=> {
        if (props.onGivingCirclePageSet) {
          getAllCircles();
        }
    }, [props.onGivingCirclePageSet]);

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );
    
    const [circles, setCircles] = useState([]);
    const [selectedGivingCircle, setSelectedGivingCircle] = useState("");


    const getAllCircles = async ()=> {
        let x = await factoryContract.instancesCount();
        let arr = [];

        for (let i = 0; i < x; i++) {
            arr.push(i);
        }
        setCircles(arr);
    }

    const [proposalAddresses, setProposalAddresses] = useState([]);

    const [attendees, setAttendees] = useState([]);

    const addAttendeeField = ()=> {
        let data = [...attendees, "new attendee"];
        setAttendees(data);
        console.log(data);
    }

    const addAttendees = async ()=> {
        console.log(attendees);
        let tx = await selectedInstance.registerAttendees(attendees);
        tx.wait();
        console.log("Registered attendees!");
    }

    const handleAttendeeFieldChange = (index, event)=> {
        let data = [...attendees];
        data[index] = event.target.value;
        console.log(data);
        setAttendees(data);
    }

    const [selectedInstance, setSelectedInstance] = useState('');

    const [phase, setPhase] = useState();

    const handleGivingCircleSelected = async (event)=> {
        setSelectedGivingCircle(event.target.value);

        const instanceAddress = await factoryContract.instances(event.target.value);

        const contract = new ethers.Contract(
            instanceAddress,
            implementationABI,
            props.connectedWalletInfo.provider
        );

        setSelectedInstance(contract);

        let phase = await contract.phase();
        setPhase(phase);
    }

    let phaseOutput;
    
    if (phase === 1) {
        phaseOutput =
        <div>
            <p>Attendees To Add</p>
            <div><button onClick={addAttendeeField}>New Attendee</button></div>
            {
                attendees.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name ="attendee"
                                placeholder="Attendee"
                                value={input.name}
                                onChange= {event => handleAttendeeFieldChange(index, event)}
                            />
                        </div>            
                        )
                })
            }
            <div><button onClick={addAttendees}>Add All Attendees</button></div>
        </div>;
    };

    return <CenteredCard title="Giving Circle">
        <p>{selectedGivingCircle}</p>
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
        
        <GivingCircleNavBar></GivingCircleNavBar>

        {
            phaseOutput
        }
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;
