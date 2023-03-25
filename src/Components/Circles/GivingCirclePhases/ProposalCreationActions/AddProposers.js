import React, { useState } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import "./AddProposers.css";

const AddProposers = (props)=> {
    const [proposers, setProposers] = useState([]);

    const addProposerField = ()=> {
        let data = [...proposers, "new attendee"];
        setProposers(data);
    }

    const addProposers = async ()=> {
        let tx = await props.selectedInstance.batchCreateNewProposals(proposers);
        tx.wait();
        console.log("Registered all proposers!");
    }

    const handleProposerFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index] = event.target.value;
        console.log(data);
        setProposers(data);
    }

    return <CenteredCard className="addProposers" title="Add Proposers">
        <div>
            <p>Proposers To Add</p>
            <div><button onClick={addProposerField}>New Proposer</button></div>
            {
                proposers.map((input, index) => {
                    return (
                        <div key={index}>
                            <input
                                name ="proposer"
                                placeholder="Proposer"
                                value={input.name}
                                onChange= {event => handleProposerFieldChange(index, event)}
                            />
                        </div>            
                        )
                })
            }
            <div><button className="semiBigButton" onClick={addProposers}>Add Proposers</button></div>
        </div>;
        </CenteredCard>
}

export default AddProposers;
