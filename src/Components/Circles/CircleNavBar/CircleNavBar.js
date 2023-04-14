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

    return <CenteredCard className="circleNavBar">
        <div id="buttonContainer">

        <button className="bigButton" onClick={()=> {handleClick('circleInfo')}}>
            Info
        </button>
        <button className="bigButton" onClick={()=> {handleClick('circlePhaseActions')}}>
            Interactions
        </button>
        </div>
    </CenteredCard>
}

export default CircleNavBar;