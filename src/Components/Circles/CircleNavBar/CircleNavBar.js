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
        <p>Overview</p>
        <button className="bigButton" onClick={()=> {handleClick('circleInfo')}}>
            Information
        </button>
        <button className="bigButton" onClick={()=> {handleClick('circlePhaseActions')}}>
            Actions
        </button>
        </div>
    </CenteredCard>
}

export default CircleNavBar;