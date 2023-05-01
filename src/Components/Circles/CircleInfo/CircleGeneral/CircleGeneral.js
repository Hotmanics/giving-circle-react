import React, { useState } from 'react';
import { ethers } from "ethers"
import "./CircleGeneral.css";
import InfoCard from './InfoCard/InfoCard';

const CircleGeneral = (props)=> {

    const [phase, setPhase] = useState('');

    const [totalBeansDispursed, setTotalBeansDispursed] = useState(99);
    const [totalBeansToDispurse, setTotalBeansToDispurse] = useState(99);

    const get = async ()=> {

        let phase = await props.selectedInstance.phase();

        if (phase === 0) {
            setPhase("Unitialized");

        } else if (phase === 1) {
            setPhase("Proposal Creation");
            
        } else if (phase === 2) {
            setPhase("Bean Placement");

        } else if (phase === 3) {
            setPhase("Gift Redemption");
        }

        let totalBeansToDispurse = await props.selectedInstance.beansToDispursePerAttendee();
        setTotalBeansToDispurse(totalBeansToDispurse.toNumber());

        let totalBeansDispursed = await props.selectedInstance.getTotalBeansDispursed();
        setTotalBeansDispursed(totalBeansDispursed.toNumber());
    }

    get();

    const[leaderField, setLeaderField] = useState('');
    const handleLeaderField = (event) => {
        setLeaderField(event.target.value);
    }

    const handleLeaderBtn = async () => {
            let LEADER_ROLE = await props.selectedInstance.LEADER_ROLE();
    
            props.onBoastMessage("Granting Leader Role To " + leaderField + "...");
            let tx = await props.selectedInstance.grantRole(LEADER_ROLE, leaderField);
            tx.wait();
            props.onBoastMessage("Granted Leader Role To " + leaderField + "!");
    }

    const[fundsManagerField, setFundsManagerField] = useState('');
    const handleFundsManagerField = (event) => {
        setFundsManagerField(event.target.value);
    }

    const handleFundsManagerBtn = async () => {
            let FUNDS_MANAGER_ROLE = await props.selectedInstance.FUNDS_MANAGER_ROLE();
    
            props.onBoastMessage("Granting Funds Manager Role To " + fundsManagerField + "...");
            let tx = await props.selectedInstance.grantRole(FUNDS_MANAGER_ROLE, fundsManagerField);
            tx.wait();
            props.onBoastMessage("Granted Funds Manager Role To " + fundsManagerField + "!");
    }

    const[adminField, setAdminField] = useState('');
    const handleAdminField = (event) => {
        setAdminField(event.target.value);
    }

    const handleAdminBtn = async () => {
            let ADMIN_ROLE = await props.selectedInstance.DEFAULT_ADMIN_ROLE();

            props.onBoastMessage("Granting Admin Role To " + adminField + "...");
            let tx = await props.selectedInstance.grantRole(ADMIN_ROLE, adminField);
            tx.wait();
            props.onBoastMessage("Granted Admin Role To " + adminField + "!");
    }

    const[beanPlacerManagerField, setBeanPlacerManagerField] = useState('');
    const handleBeanPlacerManagerField = (event) => {
        setBeanPlacerManagerField(event.target.value);
    }

    const handleBeanPlacerManagerBtn = async () => {
            let BEAN_PLACEMENT_ADMIN_ROLE = await props.selectedInstance.BEAN_PLACEMENT_ADMIN_ROLE();
    
            props.onBoastMessage("Granting Leader Role To " + beanPlacerManagerField + "...");
            let tx = await props.selectedInstance.grantRole(BEAN_PLACEMENT_ADMIN_ROLE, beanPlacerManagerField);
            tx.wait();
            props.onBoastMessage("Granted Leader Role To " + beanPlacerManagerField + "!");
    }

    let admin;
    if (props.hasAdminRole) {
        admin =  <div>

           <div>
        <input type="text" placeholder="Wallet" onChange={handleAdminField}/>
        <button onClick={handleAdminBtn}>Grant: Admin Role</button>
    </div>
        
    <div>
        <input type="text" placeholder="Wallet" onChange={handleLeaderField}/>
        <button onClick={handleLeaderBtn}>Grant: Leader Role</button>
    </div>
    <div>
        <input type="text" placeholder="Wallet" onChange={handleBeanPlacerManagerField}/>
        <button onClick={handleBeanPlacerManagerBtn}>Grant: Bean Placement Manager Role</button>
        </div>

    <div>
        <input type="text" placeholder="Wallet" onChange={handleFundsManagerField}/>
        <button onClick={handleFundsManagerBtn}>Grant: Funds Manager Role</button>
    </div>
    </div>
    }





    let addressCard = {};
    addressCard.title = "Address";
    addressCard.description = "The smart contract of the Giving Circle.";
    addressCard.value = props.selectedInstance.address;

    let phaseCard = {};
    phaseCard.title = "Phase";
    phaseCard.description = "The current phase of the Giving Circle.";
    phaseCard.value = phase;

    let totalBeans = {};
    totalBeans.title = "Total Beans To Dispurse";
    totalBeans.description = "The total number of beans to dispurse to each attendee.";
    totalBeans.value = totalBeansToDispurse;

    let totalDispursed = {};
    totalDispursed.title = "Total Beans Dispursed";
    totalDispursed.description = "The total number of beans dispursed across all attendees.";
    totalDispursed.value = totalBeansDispursed;

    return <div>
        <InfoCard info = {addressCard}></InfoCard>
        <InfoCard info = {phaseCard}></InfoCard>
        <InfoCard info = {totalBeans}></InfoCard>
        <InfoCard info = {totalDispursed}></InfoCard>
        { admin }
    </div>
}

export default CircleGeneral;