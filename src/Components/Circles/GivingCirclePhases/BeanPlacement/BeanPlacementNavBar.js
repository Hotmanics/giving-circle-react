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
        <button onClick={()=> {handleClick('placeBeans')}}>
            Place Beans
        </button>
        <button onClick={()=> {handleClick('progressToGiftRedemptionPhase')}}>
            Progress To Gift Redemption Phase
        </button>
    </CenteredCard>
}

export default BeanPlacementNavBar;