import React, { useState } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import "./AddProposers.css";

const AddProposers = (props)=> {
    const [proposers, setProposers] = useState([]);

    const addProposerField = ()=> {
        let data = [...proposers, 
            { 
                contributor : "",
                contributorName: "A", 
                contributions: "My contributions",
                beansReceived:0,
                giftAmount:0,
                hasRedeemed:false
            }
        ];
        setProposers(data);
    }

    const addProposers = async ()=> {
        // let tx = await props.selectedInstance.batchCreateNewProposals(proposers);
        // tx.wait();
        // console.log("Registered all proposers!");

        console.log(proposers);
        try {
            let tx = await props.selectedInstance.batchCreateNewProposals(proposers);
            props.onBoastMessage("Adding Proposers...");
            tx.wait();
            props.onBoastMessage("Added Proposers!");
        } catch (e) {
            console.log(e);
            props.onBoastMessage("Please enter valid address(es)!");
        }


    }

    const handleProposerAddressFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].contributor = event.target.value;
        setProposers(data);
    }

    const handleProposerNameFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].contributorName = event.target.value;
        console.log(data);
        setProposers(data);
    }

    const handleProposerContributionsFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].contributions = event.target.value;
        console.log(data);
        setProposers(data);
    }

    return <CenteredCard className="addProposers" title="Add Proposers">
        <div>
            <p>Proposers To Add</p>
            <div><button onClick={addProposerField}>New Proposer</button></div>
            {
                proposers.map((input, index) => {
                    console.log(input);
                    return (
                        <div key={index}>
                            <input
                                name ="proposer"
                                placeholder="Wallet"
                                // value={input.address}
                                onChange= {event => handleProposerAddressFieldChange(index, event)}
                            />

                            <input
                                name ="proposerName"
                                placeholder="Name"
                                // value={input.name}
                                onChange= {event => handleProposerNameFieldChange(index, event)}
                            />

                            <input
                                name ="proposerContributions"
                                placeholder="Contributions"
                                // value={input.contributions}
                                onChange= {event => handleProposerContributionsFieldChange(index, event)}
                            />
                        </div>            
                        )
                })
            }
            <div><button className="semiBigButton" onClick={addProposers}>Add Proposers (Leader)</button></div>
        </div>;
        </CenteredCard>
}

export default AddProposers;
