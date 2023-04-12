import { ethers } from "ethers"
import React, { useState } from 'react';
import "./RolesReader.css";
import CenteredCard from "../Cards/Centered Card/CenteredCard";

const RolesReader = (props)=> {
    const [finalString, setFinalString] = useState('');
    
    const getRoles = async (roleInBytes)=> {

        let ADMIN_ROLE = await props.factoryContract.DEFAULT_ADMIN_ROLE();
        let CIRCLE_CREATOR_ROLE = await props.factoryContract.CIRCLE_CREATOR_ROLE();

        let hasAdminRole = await props.factoryContract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);
        let hasCircleCreatorRole = await props.factoryContract.hasRole(CIRCLE_CREATOR_ROLE, props.connectedWalletInfo.account);

        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        if (hasCircleCreatorRole) {
            currentRoles.push("Circle Creator");
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

    return <CenteredCard className="rolesReader" title="Your Giving Circle Creator Roles">
        <p>: {finalString}</p>
        </CenteredCard>
}

export default RolesReader;