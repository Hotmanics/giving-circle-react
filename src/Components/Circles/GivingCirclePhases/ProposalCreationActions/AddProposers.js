import React, { useState } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import "./AddProposers.css";

const AddProposers = (props)=> {

    let templateContributor = {
        addr : "",
        name: "A", 
        contributions: "My contributions",
        fundsAllocated:0,
        hasRedeemed:false
    };

    const [proposers, setProposers] = useState([templateContributor]);

    const addProposerField = ()=> {
        let data = [...proposers, templateContributor];
        setProposers(data);
    }

    const addProposers = async ()=> {
        // let tx = await props.selectedInstance.batchCreateNewProposals(proposers);
        // tx.wait();
        // console.log("Registered all proposers!");

        console.log(proposers);
        try {
            let tx = await props.selectedInstance.batchCreateNewProposals(proposers);
            props.onBoastMessage("Adding Contributors...");
            tx.wait();
            props.onBoastMessage("Added Contributors!");
        } catch (e) {
            console.log(e);
            props.onBoastMessage("Please enter valid address(es)!");
        }


    }

    const handleProposerAddressFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].addr = event.target.value;
        setProposers(data);
    }

    const handleProposerNameFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].name = event.target.value;
        console.log(data);
        setProposers(data);
    }

    const handleProposerContributionsFieldChange = (index, event)=> {
        let data = [...proposers];
        data[index].contributions = event.target.value;
        console.log(data);
        setProposers(data);
    }

    return <CenteredCard className="addProposers" title="Add Contributors">
        <div>
            <p>Contributors are those who have dedicate time/energy/resources to the DAO.</p>
            <div><button onClick={addProposerField}>+</button></div>
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
                            <div>
                            <textarea
                                name ="proposerContributions"
                                placeholder="Contributions"
                                // value={input.contributions}
                                onChange= {event => handleProposerContributionsFieldChange(index, event)}
                            />
                            </div>

                            
                        </div>            
                        )
                })
            }
            <div><button className="semiBigButton" onClick={addProposers}>Add Contributors (Leader)</button></div>
        </div>;
        </CenteredCard>
}

export default AddProposers;
