// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import ProposalCreationNavBar from "./ProposalCreationActions/ProposalCreationNavBar";
import AddAttendees from "./ProposalCreationActions/AddAttendees";
import AddProposers from "./ProposalCreationActions/AddProposers";
import BeanPlacementNavBar from "./BeanPlacement/BeanPlacementNavBar";
import PlaceBeans from "./BeanPlacement/PlaceBeans";

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
    const [placeBeansStateTrigger, setPlaceBeansStateTrigger] = useState('');
    const [addFundsStateTrigger, setAddFundsStateTrigger] = useState('');

    const handleStateSet = async (state)=> {
        if (state === 'addAttendees') {
            setAddAttendeesStateTrigger((addAttendeesStateTrigger) => {
                addAttendeesStateTrigger++;
                setPhaseOutput(
                    <AddAttendees selectedInstance={props.selectedInstance}></AddAttendees>
                );
                return addAttendeesStateTrigger;
            });
        } else if (state === 'addProposers') {
            setAddProposersStateTrigger((addProposersStateTrigger) => {
                addProposersStateTrigger++;
                setPhaseOutput(
                    <AddProposers selectedInstance={props.selectedInstance}></AddProposers>
                );
                return addProposersStateTrigger;
            });
        } else if (state === "progressToBeanPlacementPhase") {
            let tx = await props.selectedInstance.ProgressToBeanPlacementPhase();
            await tx.wait();
            console.log("progressed phase!");
            getPhase();
        }

        if (state === "placeBeans") {
            setPlaceBeansStateTrigger((placeBeansStateTrigger) => {
                placeBeansStateTrigger++;
            setPhaseOutput(
                <PlaceBeans onPageSet={placeBeansStateTrigger} selectedInstance={props.selectedInstance} connectedWalletInfo={props.connectedWalletInfo}></PlaceBeans>
            );
            return placeBeansStateTrigger;
            });
        } else if (state === "progressToGiftRedemptionPhase") {
            let tx = await props.selectedInstance.ProgressToGiftRedeemPhase();
            await tx.wait();
            console.log("progressed to gift redemption!");
            getPhase();
        } 
        
    }

    let phaseNavigationOutput;
    
    if (phase === "Proposal Creation") {
        phaseNavigationOutput = <ProposalCreationNavBar onStateSet={handleStateSet}></ProposalCreationNavBar>;
    } else if (phase === "Bean Placement") {
        phaseNavigationOutput = <BeanPlacementNavBar onStateSet={handleStateSet}></BeanPlacementNavBar>;
    }

    return <CenteredCard title="Interactions">
        <p>Phase: { phase }</p>
        <div>
            {phaseNavigationOutput}
            {phaseOutput}
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;