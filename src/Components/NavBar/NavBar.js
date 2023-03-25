import React, { useState } from 'react';
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import "./NavBar.css";

const NavBar = (props)=> {

    const [state, setState] = useState('');

    const handleClick = (_state)=> {
        setState(_state);
        console.log(_state);
        props.onStateSet(_state);
    }   

    return <CenteredCard>
        <button className="bigButton" onClick={()=> {handleClick('factoryInfo')}}>
            Factory Info
        </button>
        <button className="bigButton" onClick={()=> {handleClick('factoryInteractions')}}>
        Create New Giving Cirlce
        </button>

        <button className="bigButton"  onClick={()=> {handleClick('givingCircle')}}>
            Giving Circles
        </button>

    </CenteredCard>
}

export default NavBar;