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
        <button onClick={()=> {handleClick('addAttendees')}}>
            Add Attendees
        </button>
        <button onClick={()=> {handleClick('addProposers')}}>
            Add Proposers
        </button>
    </CenteredCard>
}

export default ProposalCreationNavBar;