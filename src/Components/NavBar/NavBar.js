import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const NavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button onClick={()=> {handleClick('contractInfo')}}>
            Contract Info
        </button>
        <button onClick={()=> {handleClick('givingCircleFactory')}}>
            Giving Circle Factory
        </button>

        <button onClick={()=> {handleClick('givingCircle')}}>
            Giving Circles
        </button>

    </CenteredCard>
}

export default NavBar;