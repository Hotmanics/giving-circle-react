import React, { useState } from 'react';
import CenteredCard from '../../../Cards/Centered Card/CenteredCard';
const ProposalCreationNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button className="semiBigButton" onClick={()=> {handleClick('addAttendees')}}>
            Add Attendees
        </button>
        <button className="semiBigButton" onClick={()=> {handleClick('addProposers')}}>
            Add Proposers
        </button>
        <button className="semiBigButton" onClick={()=> {handleClick('progressToBeanPlacementPhase')}}>
            Progress To Bean Placement Phase
        </button>
    </CenteredCard>
}

export default ProposalCreationNavBar;