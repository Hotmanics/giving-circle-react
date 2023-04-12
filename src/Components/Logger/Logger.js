import React, { useState } from 'react';
import "./Logger.css";

const Logger = (props)=> {

    let msg = props.boastMessage === '' ? "" : props.boastMessage;
    let output;
    if (msg.length > 0 ) {
        output = <div className="logger">
        <p>{msg} </p>
        </div>
    } else {
        output = <div></div>
    }
    return <div>{output}</div>
}

export default Logger;