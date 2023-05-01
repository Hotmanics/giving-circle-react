import React, { useState, useEffect } from 'react';
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import "./FactoryNavBar.css";
import FactoryInfo from "../FactoryInfo/FactoryInfo";
import FactoryInteractions from "../FactoryInteractions/FactoryInteractions";
import RolesReader from "../../Roles Reader/RolesReader";

const FactoryNavBar = (props)=> {

    const [currentRoles, setCurrentRoles] = useState([]);

    const [factoryInfo, setFactoryInfo] = useState();

    useEffect(()=> {
        async function fetch() {
            let roles = await getRoles();

            setFactoryInfo( <FactoryInfo 
                onBoastMessage={handleLogger} 
                onPageSet={factoryInfoTrigger}
                connectedWalletInfo={props.connectedWalletInfo}
                factoryContract={props.factoryContract}
                currentRoles={roles}
            ></FactoryInfo>
            );

            let isCreator = false;
            for (let i = 0; i < roles.length; i++) {
                if (roles[i] === "Circle Creator") {
                    isCreator = true;
                    break;
                }
            }

            if (isCreator) {
                
                setOutput(
                    <FactoryInteractions 
                    onBoastMessage={handleLogger} 
                    connectedWalletInfo={props.connectedWalletInfo}
                    factoryContract={props.factoryContract}
                ></FactoryInteractions>
                );
                
            } else {
                setOutput(
                    <FactoryInfo 
                        onBoastMessage={handleLogger} 
                        onPageSet={factoryInfoTrigger}
                        connectedWalletInfo={props.connectedWalletInfo}
                        factoryContract={props.factoryContract}
                        currentRoles={roles}
                    ></FactoryInfo>
                        );
            }
        }
        fetch();

    }, [props.onPageSet]);

    const [factoryInfoTrigger, setFactoryInfoTrigger] = useState(0);

    const handleLogger = (message)=> {
        props.onBoastMessage(message);
    }   

    const [output, setOutput] = useState();

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
        return currentRoles;
    }


    let navOutput;

    let isPresent = false;
    for (let i = 0; i < currentRoles.length; i++) {
        if (currentRoles[i] == "Circle Creator") {
            isPresent = true;
        }
    }

    if (isPresent) {
        navOutput = <div><CenteredCard title="Giving Circles Factory">
            <button className="bigButton" onClick={()=> {handleClick('factoryInfo')}}>
            Configuration
            </button>
            <button className="bigButton" onClick={()=> {handleClick('factoryInteractions')}}>
            Giving Circle Creation
            </button>
            </CenteredCard></div>
    } else {
        navOutput = <div><CenteredCard title="Giving Circles Factory">
            <button className="bigButton" onClick={()=> {handleClick('factoryInfo')}}>
            Configuration
            </button>
            </CenteredCard></div>    
    }

    return <div className='factoryNavBar'>
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