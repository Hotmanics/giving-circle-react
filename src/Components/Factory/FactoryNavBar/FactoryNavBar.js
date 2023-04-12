import React, { useState, useEffect } from 'react';
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import "./FactoryNavBar.css";
import FactoryInfo from "../FactoryInfo/FactoryInfo";
import FactoryInteractions from "../FactoryInteractions/FactoryInteractions";
import RolesReader from "../../Roles Reader/RolesReader";

const FactoryNavBar = (props)=> {

    const [factoryInfo, setFactoryInfo] = useState();

    useEffect(()=> {
        setFactoryInfo( <FactoryInfo 
            onBoastMessage={handleLogger} 
            onPageSet={factoryInfoTrigger}
            connectedWalletInfo={props.connectedWalletInfo}
            factoryContract={props.factoryContract}
        ></FactoryInfo>
        );
        if (props.onPageSet) {
            
        }
    }, [props.onPageSet]);

    const [factoryInfoTrigger, setFactoryInfoTrigger] = useState(0);

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [output, setOutput] = useState(factoryInfo);

    const handleClick = (_state)=> {

        if (_state === 'factoryInfo') {
            setOutput(factoryInfo);
        }
        else if (_state === 'factoryInteractions') {
            setOutput(
                <FactoryInteractions 
                    onBoastMessage={handleLogger} 
                    connectedWalletInfo={props.connectedWalletInfo}
                    factoryContract={props.factoryContract}
                ></FactoryInteractions>
            );
        }
    }   

    const [currentRoles, setCurrentRoles] = useState([]);

    const getRoles = async ()=> {

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

        setCurrentRoles(currentRoles);
    }

    getRoles();

    let navOutput;

    let isPresent = false;
    for (let i = 0; i < currentRoles.length; i++) {
        if (currentRoles[i] == "Circle Creator") {
            isPresent = true;
        }
    }

    if (isPresent) {
        navOutput = <div><CenteredCard>
            <button className="bigButton" onClick={()=> {handleClick('factoryInfo')}}>
            Giving Circles Setup
            </button>
            <button className="bigButton" onClick={()=> {handleClick('factoryInteractions')}}>
            Giving Circle Creation
            </button>
            </CenteredCard></div>
    } else {
        navOutput = <div><CenteredCard>
            <button className="bigButton" onClick={()=> {handleClick('factoryInfo')}}>
            Giving Circles Setup
            </button>
            </CenteredCard></div>    
    }

    return <div>
        {navOutput}
        <div>
            <RolesReader connectedWalletInfo={props.connectedWalletInfo} factoryContract={props.factoryContract} onBoastMessage={handleLogger} ></RolesReader>
        </div>
        <div>
            {output}
        </div>
    </div>
}

export default FactoryNavBar;