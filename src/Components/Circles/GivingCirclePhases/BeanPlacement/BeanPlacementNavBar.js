import React, { useState } from 'react';
import CenteredCard from '../../../Cards/Centered Card/CenteredCard';
import "./BeanPlacementNavBar.css";

const BeanPlacementNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   


    let output;

    console.log(props.currentRoles);

    let isLeader = false;

    for (let i  = 0; i < props.currentRoles.length; i++) {
        if (props.currentRoles[i] === 'Circle Leader') {

            isLeader = true;

        
            break;
        }
    }

    if (isLeader) {
        output = <div id = "boxContainer">
            <button className="semiBigButton" onClick={()=> {handleClick('placeBeans')}}>
                Place Beans
            </button>
            <button className="semiBigButton" onClick={()=> {handleClick('progressToGiftRedemptionPhase')}}>
                Progress To Gift Redemption Phase
            </button>
            </div>;
    } else {
        output = <div id = "boxContainer">
            <button className="semiBigButton" onClick={()=> {handleClick('placeBeans')}}>
                Place Beans
            </button>
            </div>;
    }

    return <CenteredCard className="beanPlacementNavBar">
            {/* <button className="semiBigButton" onClick={()=> {handleClick('placeBeans')}}>
            Place Beans
        </button> */}
        {output}
    </CenteredCard>
}

export default BeanPlacementNavBar;