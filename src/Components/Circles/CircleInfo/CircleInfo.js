import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import "./CircleInfo.css";

const CircleInfo = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [phase, setPhase] = useState('');
    const [attendees, setAttendees] = useState([]);

    const getInfo = async ()=> {
        
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

        let attendees = await props.selectedInstance.getAttendees();
        setAttendees(attendees);
    }

    return <CenteredCard title="Info">
        <p>Address: { props.selectedInstance.address }</p>
        <p>Phase: { phase }</p>
        <h2>Attendess: </h2>
        <table>
            <tbody>
            <tr>
                <th>Address</th>
                <th>Beans</th>
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
        </CenteredCard>
}

export default CircleInfo;