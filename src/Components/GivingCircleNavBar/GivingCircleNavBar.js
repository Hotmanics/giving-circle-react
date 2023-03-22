import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const GivingCircleNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button onClick={()=> {handleClick('circleInfo')}}>
            Circle Info
        </button>
        <button onClick={()=> {handleClick('circlePhaseActions')}}>
            Circle Phase Actions
        </button>
    </CenteredCard>
}

export default GivingCircleNavBar;