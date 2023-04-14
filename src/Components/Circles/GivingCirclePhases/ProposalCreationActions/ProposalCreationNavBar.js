import React, { useState } from 'react';
import CenteredCard from '../../../Cards/Centered Card/CenteredCard';
import "./ProposalCreationNavBar.css";

const ProposalCreationNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    let output;

    let isLeader = false;

    console.log(props.connectedWalletRoles);
    
    for (let i = 0; i < props.connectedWalletRoles.length; i++) {
        
        if (props.connectedWalletRoles[i] === "Circle Leader") {
            isLeader = true;
        }
    }

    if (isLeader) {
        output = <div id="boxContainer"><button className="semiBigButton" onClick={()=> {handleClick('addProposers')}}>
        Contributors
        </button>
    
        <button className="semiBigButton" onClick={()=> {handleClick('addAttendees')}}>
        Add Attendees
        </button>

        <button className="semiBigButton" onClick={()=> {handleClick('progressToBeanPlacementPhase')}}>
            Progress To Bean Placement Phase
        </button></div>
    } else {
        output = <div id="boxContainer"><button className="semiBigButton" onClick={()=> {handleClick('addProposers')}}>
            Contributors
        </button></div>
    }

    return <CenteredCard className="proposalCreationNavBar">
        { output }
    </CenteredCard>
}

export default ProposalCreationNavBar;