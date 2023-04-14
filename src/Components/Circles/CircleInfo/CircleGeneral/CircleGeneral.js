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
    </div>
}

export default CircleGeneral;