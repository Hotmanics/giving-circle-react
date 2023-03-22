// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";
import { implementationABI } from "../../ImplementationInfo";
import GivingCircleNavBar from "../GivingCircleNavBar/GivingCircleNavBar";

const GivingCirclePhases = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getPhase();
        }
    }, [props.onPageSet]);

    const [phase, setPhase] = useState();

    const getPhase = async ()=> {
        
        let p = await props.selectedInstance.phase();
        setPhase(p);
    }

    const factoryContract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    const [proposalAddresses, setProposalAddresses] = useState([]);

    const [attendees, setAttendees] = useState([]);

    const addAttendeeField = ()=> {
        let data = [...attendees, "new attendee"];
        setAttendees(data);
        console.log(data);
    }

    const addAttendees = async ()=> {
        console.log(attendees);
        let tx = await props.selectedInstance.registerAttendees(attendees);
        tx.wait();
        console.log("Registered attendees!");
    }

    const handleAttendeeFieldChange = (index, event)=> {
        let data = [...attendees];
        data[index] = event.target.value;
        console.log(data);
        setAttendees(data);
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
        <p>
            { phase }
        </p>
        <div id="aye">
        {
            phaseOutput
        }
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;
