import React, { useState } from 'react';
import CenteredCard from '../../../Cards/Centered Card/CenteredCard';

const BeanPlacementNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button className="semiBigButton" onClick={()=> {handleClick('placeBeans')}}>
            Place Beans
        </button>
        <button className="semiBigButton" onClick={()=> {handleClick('progressToGiftRedemptionPhase')}}>
            Progress To Gift Redemption Phase (CAN SAFELY SEND FUNDS TO RESPECTIVE PLACES DURING THIS ACTION IF ALL USERS ARE KYCED)
        </button>
    </CenteredCard>
}

export default BeanPlacementNavBar;