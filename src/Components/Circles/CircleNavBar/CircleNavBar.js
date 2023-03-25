import React, { useState } from 'react';
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import "./CircleNavBar.css";

const CircleNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard className="givingCircleNavBar">
        <button onClick={()=> {handleClick('circleInfo')}}>
            Info
        </button>
        <button onClick={()=> {handleClick('circlePhaseActions')}}>
            Interactions
        </button>
    </CenteredCard>
}

export default CircleNavBar;