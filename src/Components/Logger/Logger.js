import React, { useState } from 'react';
import CenteredCard from '../Cards/Centered Card/CenteredCard';
import "./Logger.css";

const Logger = (props)=> {

    let msg = props.boastMessage === '' ? "" : props.boastMessage;

    return <CenteredCard className="logger">
        <p>{msg}</p>
        </CenteredCard>
}

export default Logger;