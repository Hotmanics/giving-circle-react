// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";
import { implementationABI } from "../../../Smart Contracts Info/ImplementationInfo";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import GivingCircleNavBar from "../CircleNavBar/CircleNavBar";
import ProposalCreationNavBar from "./ProposalCreationActions/ProposalCreationNavBar";

const GivingCirclePhases = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getPhase();
        }
    }, [props.onPageSet]);

    const [phase, setPhase] = useState('');

    const getPhase = async ()=> {
        let phase = await props.selectedInstance.phase();

        if (phase === 0) {
            setPhase("Unitialized");

        } else if (phase === 1) {
            setPhase("Proposal Creation");
            
        } else if (phase === 2) {
            setPhase("Bean Placement");

        } else if (phase === 3) {
            setPhase("Gift Redemption");
        }
    }

    const [output, setOutput] = useState('');

    const [addAttendeesStateTrigger, setAddAttendeesStateTrigger] = useState('');
    const [addProposersStateTrigger, setAddProposersStateTrigger] = useState('');

    const handleStateSet = (state)=> {
        if (state === 'circleInfo') {
            setAddAttendeesStateTrigger((addAttendeesStateTrigger) => {
                addAttendeesStateTrigger++;
                setOutput(
                    // <GivingCircleInfo connectedWalletInfo = {props.connectedWalletInfo} onPageSet={addAttendeesStateTrigger} selectedInstance={props.selectedInstance}></GivingCircleInfo>
                );
                return addAttendeesStateTrigger;
            });
        } else if (state === 'circlePhaseActions') {
            setAddProposersStateTrigger((addProposersStateTrigger) => {
                addProposersStateTrigger++;
                setOutput(
                    // <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} onPageSet={addProposersStateTrigger} selectedInstance={props.selectedInstance}></GivingCirclePhases>
                );
                return addProposersStateTrigger;
            });
        }
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
    
    if (phase === "Proposal Creation") {
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

    return <CenteredCard title="Interactions">
        <p>
            Phase: { phase }
        </p>
        <ProposalCreationNavBar onStateSet={handleStateSet}></ProposalCreationNavBar>
        <div>
        {
            phaseOutput
        }
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;
