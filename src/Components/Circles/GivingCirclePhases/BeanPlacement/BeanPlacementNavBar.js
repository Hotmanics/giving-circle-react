import React, { useState } from 'react';
import CenteredCard from '../../../Cards/Centered Card/CenteredCard';

const BeanPlacementNavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   


    return <CenteredCard>
        <button className="semiBigButton" onClick={()=> {handleClick('placeBeans')}}>
            Place Beans
        </button>
        <button className="semiBigButton" onClick={()=> {handleClick('progressToGiftRedemptionPhase')}}>
            Progress To Gift Redemption Phase (Leader)
        </button>
    </CenteredCard>
}

export default BeanPlacementNavBar;