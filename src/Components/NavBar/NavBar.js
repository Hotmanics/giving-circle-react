import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import "./NavBar.css";

const NavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard className="navBar">
        <button className="bigButton" onClick={()=> {handleClick('givingCirclesFactory')}}>
            Giving Circles Factory
        </button>

        <button className="bigButton"  onClick={()=> {handleClick('givingCircle')}}>
            Giving Circles
        </button>

    </CenteredCard>
}

export default NavBar;