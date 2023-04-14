import React, { useState } from 'react';
import CenteredCard from "../../Cards/Centered Card/CenteredCard";

const CircleInfoNavBar = (props)=> {

    const handleClick = (_state)=> {
        console.log("set");
        props.onStateSet(_state);
    }   

    return <CenteredCard className="givingCircleNavBar">
        <button className="bigButton" onClick={()=> {handleClick('general')}}>
            General
        </button>
        <button className="bigButton" onClick={()=> {handleClick('attendees')}}>
            Attendees
        </button>
        <button className="bigButton" onClick={()=> {handleClick('contributors')}}>
            Contributors
        </button>
        <button className="bigButton" onClick={()=> {handleClick('funds')}}>
            Funds
        </button>
        <button className="bigButton" onClick={()=> {handleClick('kyc')}}>
            KYC
        </button>
    </CenteredCard>
}

export default CircleInfoNavBar;