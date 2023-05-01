import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import ProposalCreationNavBar from "./ProposalCreationActions/ProposalCreationNavBar";
import AddAttendees from "./ProposalCreationActions/AddAttendees";
import AddProposers from "./ProposalCreationActions/AddProposers";
import BeanPlacementNavBar from "./BeanPlacement/BeanPlacementNavBar";
import PlaceBeans from "./BeanPlacement/PlaceBeans";
import GiftRedeem from "./GiftRedeem/GiftRedeem";
import "./GivingCircle.css";

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
            handleStateSet("placeBeans");

        } else if (phase === 3) {
            setPhase("Gift Redemption");
            handleStateSet("Gift Redemption");
        }
    }

    const [phaseOutput, setPhaseOutput] = useState(
        <AddProposers selectedInstance={props.selectedInstance} connectedWalletRoles = {props.connectedWalletRoles} onBoastMessage={props.onBoastMessage}></AddProposers>
    );

    const [addAttendeesStateTrigger, setAddAttendeesStateTrigger] = useState('');
    const [addProposersStateTrigger, setAddProposersStateTrigger] = useState('');
    const [placeBeansStateTrigger, setPlaceBeansStateTrigger] = useState('');
    const [redeemGiftsTrigger, setRedeemGiftsTrigger] = useState('');

    const handleStateSet = async (state)=> {

        if (state === 'addAttendees') {
            setAddAttendeesStateTrigger((addAttendeesStateTrigger) => {
                addAttendeesStateTrigger++;
                setPhaseOutput(
                    <AddAttendees selectedInstance={props.selectedInstance} onBoastMessage={props.onBoastMessage}></AddAttendees>
                );
                return addAttendeesStateTrigger;
            });
        } else if (state === 'addProposers') {
            setAddProposersStateTrigger((addProposersStateTrigger) => {
                addProposersStateTrigger++;
                setPhaseOutput(
                    <AddProposers selectedInstance={props.selectedInstance} connectedWalletRoles = {props.connectedWalletRoles} onBoastMessage={props.onBoastMessage}></AddProposers>
                );
                return addProposersStateTrigger;
            });
        } else if (state === "progressToBeanPlacementPhase") {
            try {
                let tx = await props.selectedInstance.ProgressToBeanPlacementPhase();
                props.onBoastMessage("Progressing To Bean Placement Phase...");
                await tx.wait();
                props.onBoastMessage("Progressed To Bean Placement Phase!");
                getPhase();
            } catch (e) {
                props.onBoastMessage(e.reason);
            }
        }

        if (state === "placeBeans") {
            setPlaceBeansStateTrigger((placeBeansStateTrigger) => {
                placeBeansStateTrigger++;
            setPhaseOutput(
                <PlaceBeans onPageSet={placeBeansStateTrigger} selectedInstance={props.selectedInstance} connectedWalletInfo={props.connectedWalletInfo} onBoastMessage={props.onBoastMessage}></PlaceBeans>
            );
            return placeBeansStateTrigger;
            });
        } else if (state === "progressToGiftRedemptionPhase") {

            try{
                let tx = await props.selectedInstance.ProgressToFundsRedemptionPhase();
                props.onBoastMessage("Progressing To Gift Redemption Phase...");
                await tx.wait();
                props.onBoastMessage("Progressed To Gift Redemption Phase!");
                getPhase();
            } catch (e) {
                console.log(e);
                props.onBoastMessage(e.reason);
            }
        } 

        if (state === "Gift Redemption") {
            setRedeemGiftsTrigger((redeemGiftsTrigger) => {
                redeemGiftsTrigger++;
            setPhaseOutput(
                <GiftRedeem onPageSet={redeemGiftsTrigger} selectedInstance={props.selectedInstance} connectedWalletInfo={props.connectedWalletInfo} currentRoles={props.connectedWalletRoles} onBoastMessage={props.onBoastMessage}></GiftRedeem>
            );
            return redeemGiftsTrigger;
            });
        }
    }

    let phaseNavigationOutput;
    
    if (phase === "Proposal Creation") {
        phaseNavigationOutput = <ProposalCreationNavBar onStateSet={handleStateSet} connectedWalletRoles={props.connectedWalletRoles}></ProposalCreationNavBar>;
    } else if (phase === "Bean Placement") {
        phaseNavigationOutput = <BeanPlacementNavBar onStateSet={handleStateSet} currentRoles={props.connectedWalletRoles}></BeanPlacementNavBar>;
    }

    return <CenteredCard className = "givingCircle">
        <div>
            {phaseNavigationOutput}
            {phaseOutput}
        </div>

        </CenteredCard>
}

export default GivingCirclePhases;
