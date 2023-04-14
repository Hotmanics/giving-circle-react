import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";

const PlaceBeans = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    let templateSelectedContributor = {
        index: 0,
        amount: 0
    }

    const [selectedContributors, setSelectedContributors] = useState([]);

    const addSelectedContributorField = ()=> {
        let data = [...selectedContributors, templateSelectedContributor];
        setSelectedContributors(data);
    }

    const handleIndexFieldChange = (index, event) => {
        let data = [...selectedContributors];
        data[index].index = event.target.value;
        setSelectedContributors(data);
    }

    const handleAmountFieldChange = (index, event) => {
        let data = [...selectedContributors];
        data[index].amount = event.target.value;
        setSelectedContributors(data);
    }

    const [proposals, setProposals] = useState([]);
    const [numOfPlaceableBeans, setNumOfPlaceableBeans] = useState(0);

    const getInfo = async ()=> {
        let proposals = await props.selectedInstance.getProposals();
        setProposals(proposals);

        let x = await props.selectedInstance.getAvailableBeans(props.connectedWalletInfo.account);
        setNumOfPlaceableBeans(x.toNumber());

        let arr = [];
        for (let i =0; i < proposals.length; i++) {
            arr.push({
                index: 0,
                amount: 0
            })
        }
        setSelectedContributors(arr);
    }

    const [beansToPlace, setBeansToPlace] = useState(0);
    const [indexToGive, setIndexToGive] = useState(0);
    
    const handleBeansField = (event)=> {
        setBeansToPlace(event.target.value);
    }

    const handleIndexField = (event)=> {
        setIndexToGive(event.target.value);
    }

    const placeBeans = async ()=> {
        try{
            
            let indices = [];
            let amounts = [];
            for (let i = 0; i < proposals.length; i++) {
                indices.push(i);
                amounts.push(selectedContributors[i].amount);
            }

            let tx = await props.selectedInstance.placeMyBeansMultiple(indices, amounts);
            props.onBoastMessage(`Placing ${beansToPlace} bean(s) to index ${indexToGive}...`);
            await tx.wait();
            props.onBoastMessage(`Placed ${beansToPlace} bean(s) to index ${indexToGive}!`);
            getInfo();
        } catch (e) {
            props.onBoastMessage(e.reason);
        }
    }

    
    return <CenteredCard title="Place Beans">
        <div>
        <p>Your Placeable Beans: {numOfPlaceableBeans} </p>    
            <h2>Contributors: </h2>


            <table>
                <tbody>
                    <tr>
                        <th>Beans</th>
                    </tr>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Contributions</th>
                    <th>Address</th>
                    <th></th>
                </tr>

                {
                    proposals.map((value, index) => {
                    return  <tr key={index}>
                                <th>{index}</th>
                                <th>{value.contributor.name}</th>
                                <th>{value.contributor.contributions}</th>
                                <th>{value.contributor.addr}</th>
                                <th>
                                {
                                    <input
                                    name="amount"
                                    placeholder="Beans"
                                    onChange={event => handleAmountFieldChange(index, event)}
                                />
                                } 
                                </th>
                            </tr>
                    })
                }
                </tbody>
            </table>


        {/* {
            selectedContributors.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name="index"
                            placeholder="Index"
                            onChange={event => handleIndexFieldChange(index, event)}
                        />

                        <input
                            name="amount"
                            placeholder="Beans"
                            onChange={event => handleAmountFieldChange(index, event)}
                        />

                    </div>
                )
            })
        }
        <div><button onClick={addSelectedContributorField}>+</button></div> */}
{/* 
        <div id="in">
            <p>Index</p>
            <input type="number" defaultValue={0} onChange={handleIndexField}/>
        </div>
        
        <div id="in">
            <p>Beans To Place</p>
            <input type="number" defaultValue={0} onChange={handleBeansField}/>
        </div>
         */}
        <div><button onClick={placeBeans}>Place Beans</button></div>
         
        </div>;
        </CenteredCard>
}

export default PlaceBeans;
