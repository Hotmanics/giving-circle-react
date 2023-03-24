// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";

const AddProposers = (props)=> {
    const [proposers, setProposers] = useState([]);

    const addProposerField = ()=> {
        let data = [...proposers, "new attendee"];
        setProposers(data);
    }

    const addProposers = async ()=> {

        // for (let i =0; i < proposers.length; i++) {
        //     let tx = await props.selectedInstance.createNewProposal(proposers[i]);
        //     await tx.wait();
        //     console.log("Registered proposers!");    
        // }

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

    return <CenteredCard title="Add Proposers">
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
                            <button>Test</button>
                        </div>            
                        )
                })
            }
            <div><button onClick={addProposers}>Add Proposers</button></div>
        </div>;
        </CenteredCard>
}

export default AddProposers;
