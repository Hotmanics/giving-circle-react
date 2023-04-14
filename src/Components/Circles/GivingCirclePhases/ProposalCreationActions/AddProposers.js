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


    const [contributor, setContributor] = useState('');
    const [contributorName, setContributorName] = useState('');
    const [contributorContributions, setContributorContributions] = useState('');

    const handleWalletChanged = (event) => {
        setContributor(event.target.value);
    }
    
    const handleNameChanged = (event) => {
        setContributorName(event.target.value);
    }

    const handleContributionsChanged = (event) => {
        setContributorContributions(event.target.value);
    }

    const handleAddClick = async () => {
        try {
            let tx = await props.selectedInstance.createNewProposalForMe(
                {
                    addr: "0x0000000000000000000000000000000000000000",
                    name: contributorName,
                    contributions: contributorContributions,
                    hasRedeemed: false,
                    fundsAllocated: 0
                }
            );

            props.onBoastMessage("Adding Contributors...");
            tx.wait();
            props.onBoastMessage("Added Contributors!");
        } catch (e) {
            console.log(e);
            props.onBoastMessage("Please enter valid address(es)!");
        }
    }

    let addContributorsOutput;

    let isLeader = false;

    for (let i = 0; i < props.connectedWalletRoles.length; i++) {
        if (props.connectedWalletRoles[i] === "Circle Leader") {
            isLeader = true;
        }
    }

    if (isLeader) {
        addContributorsOutput = <div><h2>Add Contributors!</h2>
        {
            proposers.map((input, index) => {
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
        <div><button onClick={addProposerField}>+</button></div>

        <div><button className="semiBigButton" onClick={addProposers}>Add Contributors</button></div>
        </div>
    }
     
    return <CenteredCard className="addProposers" title="Contributors">
        <div>
            <p>Contributors are those who have dedicated time/energy/resources to the DAO.</p>

            {addContributorsOutput}


            <div>
            <h2>Add Yourself!</h2>
            <p>Have you contributed to the DAO this month? Please fill out the form below and add yourself as a contributor to the Giving Circle!</p>
            {/* <input
                name ="proposerWallet"
                placeholder="Wallet"
                onChange= {handleWalletChanged}
            /> */}
            <input
                name ="proposerName"
                placeholder="Name"
                onChange= {handleNameChanged}
            />
            <div>
            <textarea
                name ="proposerContributions"
                placeholder="Contributions"
                onChange= {handleContributionsChanged}
            /></div>
            <button className="semiBigButton" onClick={handleAddClick}>
                Become a contributor
            </button>
        </div>
        
        </div>;
        </CenteredCard>
}

export default AddProposers;
