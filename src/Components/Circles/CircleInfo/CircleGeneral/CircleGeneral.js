import React, { useState } from 'react';
import { ethers } from "ethers"

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

    

    return <div>
 <table>
            <tbody>
                <tr>
                    <th>What</th>
                    <th>Description</th>
                    <th>Value</th>
                    <th></th>
                </tr>

                <tr>
                    <th>Address</th>
                    <th>The smart contract of the Giving Circle.</th>
                    <th>{ props.selectedInstance.address }</th>
                </tr>
                <tr>
                    <th>Phase</th>
                    <th>The current phase of the Giving Circle.</th>
                    <th>{ phase }</th>
                </tr>
                <tr>
                    <th>Total Beans To Dispurse</th>
                    <th>The total number of beans to dispurse to each attendee.</th>
                    <th>{ totalBeansToDispurse }</th>
                </tr>

                <tr>
                    <th>Total Beans Dispursed</th>
                    <th>The total number of beans dispursed across all attendees.</th>
                    <th>{ totalBeansDispursed }</th>
                </tr>

            </tbody>
        </table>

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

export default CircleGeneral;