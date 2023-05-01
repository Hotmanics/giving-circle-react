import { ethers } from "ethers"
import React, { useState, useEffect } from 'react';
import "./CircleRolesReader.css";

const CircleRolesReader = (props)=> {

    const [finalString, setFinalString] = useState('');

    const getRoles = async ()=> {

        let ADMIN_ROLE = await props.circleContract.DEFAULT_ADMIN_ROLE();
        let LEADER_ROLE = await props.circleContract.LEADER_ROLE();
        let FUNDS_MANAGER_ROLE = await props.circleContract.FUNDS_MANAGER_ROLE();

        let hasAdminRole = await props.circleContract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);
        let hasLeaderRole = await props.circleContract.hasRole(LEADER_ROLE, props.connectedWalletInfo.account);
        let hasFundsManagerRole = await props.circleContract.hasRole(FUNDS_MANAGER_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasLeaderRole) {
            currentRoles.push("Leader");
        }

        if (hasFundsManagerRole) {
            currentRoles.push("Funds Manager");
        }

        let finalString = '';
        for (let i = 0; i < currentRoles.length; i++) {
            if (i === currentRoles.length - 1) {
                finalString += currentRoles[i];
            } else {
                finalString += currentRoles[i] + ", ";
            }
        }

        setFinalString(finalString);
    }

    getRoles();

    let output;

    if (finalString.length !== 0) {
        output = <div className="circleRolesReader"><h3 className="header">Your Roles For This Giving Circle</h3>
        <p>{finalString}</p>
        </div>
    }

    return <div>
        {output}
        </div>
}

export default CircleRolesReader;