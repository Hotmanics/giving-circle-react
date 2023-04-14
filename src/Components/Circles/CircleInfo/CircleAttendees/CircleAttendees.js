import React, { useState } from 'react';
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";

const CircleAttendees = (props)=> {

    const [attendees, setAttendees] = useState([]);

    const getAttendees = async ()=> {
        let attendees = await props.selectedInstance.getAttendees();
        setAttendees(attendees);
    }

    getAttendees();

    return <div>
        <h2>Attendess: </h2>
        <p>People who are physically at the event who place beans to contributors.</p>
        <table>
            <tbody>
            <tr>
                <th>Address (Wallet)</th>
                <th>Placeable Beans</th>
            </tr>
            {
                attendees.map((value, index) => {
                return  <tr key={index}>
                            <th>{value.addr}</th>
                            <th>{value.beansAvailable.toNumber()}</th>
                        </tr>
                })
            }
            </tbody>
        </table>
    </div>
}

export default CircleAttendees;