import React, { useState } from 'react';
import CenteredCard from "../../Cards/Centered Card/CenteredCard";

const CircleNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button onClick={()=> {handleClick('circleInfo')}}>
            Info
        </button>
        <button onClick={()=> {handleClick('circlePhaseActions')}}>
            Interactions
        </button>
    </CenteredCard>
}

export default CircleNavBar;