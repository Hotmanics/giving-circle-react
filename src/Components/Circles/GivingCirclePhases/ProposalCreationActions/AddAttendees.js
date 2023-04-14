import React, { useState } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import "./AddAttendees.css";

const AddAttendees = (props)=> {
    const [attendees, setAttendees] = useState([""]);

    const addAttendeeField = ()=> {
        let data = [...attendees, ""];
        setAttendees(data);
        console.log(data);
    }

    const addAttendees = async ()=> {
        try {
            console.log(attendees);
            let tx = await props.selectedInstance.registerAttendees(attendees);
            props.onBoastMessage("Adding Attendees...");
            tx.wait();
            props.onBoastMessage("Added Attendees!");
        } catch (e) {
            props.onBoastMessage("Please enter valid address(es)!");
        }
    }

    const handleAttendeeFieldChange = (index, event)=> {
        let data = [...attendees];
        data[index] = event.target.value;
        console.log(data);
        setAttendees(data);
    }

    return <CenteredCard className="addAttendees" title="Add Attendees">
        <div>
            <p>Attendees To Add</p>
            <div><button onClick={addAttendeeField}>+</button></div>
            {
                attendees.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name ="attendee"
                                placeholder="Wallet"
                                value={input.name}
                                onChange= {event => handleAttendeeFieldChange(index, event)}
                            />
                        </div>            
                        )
                })
            }
            <div><button className="semiBigButton" onClick={addAttendees}>Add Attendees</button></div>
        </div>;
        </CenteredCard>
}

export default AddAttendees;
