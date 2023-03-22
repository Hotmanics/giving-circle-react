// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";
import { implementationABI } from "../../../Smart Contracts Info/ImplementationInfo";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import ProposalCreationNavBar from "./ProposalCreationActions/ProposalCreationNavBar";
import AddAttendeesPhase from "./ProposalCreationActions/AddAttendeesPhase";

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

    const [phaseOutput, setPhaseOutput] = useState('');

    const [addAttendeesStateTrigger, setAddAttendeesStateTrigger] = useState('');
    const [addProposersStateTrigger, setAddProposersStateTrigger] = useState('');

    const handleStateSet = (state)=> {
        if (state === 'addAttendees') {
            setAddAttendeesStateTrigger((addAttendeesStateTrigger) => {
                addAttendeesStateTrigger++;
                setPhaseOutput(
                    <AddAttendeesPhase selectedInstance={props.selectedInstance}></AddAttendeesPhase>
                );
                return addAttendeesStateTrigger;
            });
        } else if (state === 'addProposers') {
            setAddProposersStateTrigger((addProposersStateTrigger) => {
                addProposersStateTrigger++;
                setPhaseOutput(
                    // <GivingCirclePhases connectedWalletInfo = {props.connectedWalletInfo} onPageSet={addProposersStateTrigger} selectedInstance={props.selectedInstance}></GivingCirclePhases>
                );
                return addProposersStateTrigger;
            });
        }
    }

    const [proposalAddresses, setProposalAddresses] = useState([]);

    let phaseNavigationOutput;
    
    if (phase === "Proposal Creation") {
        phaseNavigationOutput = <ProposalCreationNavBar onStateSet={handleStateSet}></ProposalCreationNavBar>;
    };

    return <CenteredCard title="Interactions">
        <p>Phase: { phase }</p>
        <div>
            {phaseNavigationOutput}
            {phaseOutput}
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;
