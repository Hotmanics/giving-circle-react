// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";

const PlaceBeans = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [proposals, setProposals] = useState([]);

    const getInfo = async ()=> {
        let proposals = await props.selectedInstance.getProposals();
        setProposals(proposals);
    }

    // const [attendees, setAttendees] = useState([]);

    // const addAttendeeField = ()=> {
    //     let data = [...attendees, "new attendee"];
    //     setAttendees(data);
    //     console.log(data);
    // }

    // const addAttendees = async ()=> {
    //     console.log(attendees);
    //     let tx = await props.selectedInstance.registerAttendees(attendees);
    //     tx.wait();
    //     console.log("Registered attendees!");
    // }

    // const handleAttendeeFieldChange = (index, event)=> {
    //     let data = [...attendees];
    //     data[index] = event.target.value;
    //     console.log(data);
    //     setAttendees(data);
    // }

    const [beansToPlace, setBeansToPlace] = useState(0);
    const [indexToGive, setIndexToGive] = useState(0);

    const handleBeansField = (event)=> {
        setBeansToPlace(event.target.value);
    }

    const handleIndexField = (event)=> {
        setIndexToGive(event.target.value);
    }

    const placeBeans = async ()=> {
        let tx = await props.selectedInstance.placeMyBeans(indexToGive, beansToPlace);
        await tx.wait();
        console.log("Placed beans!");
    }

    return <CenteredCard title="Place Beans">
            <div>

            <h2>Proposers: </h2>
            <table>
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Address</th>
                </tr>
                {
                    proposals.map((value, index) => {
                    return  <tr key={index}>
                                <th>{index}</th>
                                <th>{value.proposer}</th>
                            </tr>
                    })
                }
                </tbody>
            </table>

            
        <p>Index</p>
        <input type="number" onChange={handleIndexField}/>
        
        <p>Beans To Place</p>
        <input type="number" onChange={handleBeansField}/>
        
        <div><button onClick={placeBeans}>Place Them</button></div>

            {/* <p>Attendees To Add</p>
            <div><button onClick={addAttendeeField}>New Attendee</button></div>
            {
                attendees.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name ="attendee"
                                placeholder="Attendee"
                                value={input.name}
                                onChange= {event => handleAttendeeFieldChange(index, event)}
                            />
                        </div>            
                        )
                })
            }
            <div><button onClick={addAttendees}>Add Attendees</button></div> */}
        </div>;
        </CenteredCard>
}

export default PlaceBeans;