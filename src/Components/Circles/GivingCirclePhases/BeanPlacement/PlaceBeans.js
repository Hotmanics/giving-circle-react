import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";

const PlaceBeans = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [proposals, setProposals] = useState([]);
    const [numOfPlaceableBeans, setNumOfPlaceableBeans] = useState(0);

    const getInfo = async ()=> {
        let proposals = await props.selectedInstance.getProposals();
        setProposals(proposals);

        let x = await props.selectedInstance.getAvailableBeans(props.connectedWalletInfo.account);
        setNumOfPlaceableBeans(x.toNumber());
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
            let tx = await props.selectedInstance.placeMyBeansMultiple([indexToGive], [beansToPlace]);
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
            <h2>Proposers: </h2>
            <table>
                <tbody>
                <tr>
                    <th>Index</th>
                    <th>Address</th>
                    <th>Name</th>
                    <th>Contributions</th>
                </tr>

                {
                    proposals.map((value, index) => {
                    return  <tr key={index}>
                                <th>{index}</th>
                                <th>{value.contributor.name}</th>
                                <th>{value.contributor.contributions}</th>
                                <th>{value.contributor.addr}</th>
                            </tr>
                    })
                }
                </tbody>
            </table>

        <p>Your Placeable Beans: {numOfPlaceableBeans} </p>    

        <div id="in">
            <p>Index</p>
            <input type="number" defaultValue={0} onChange={handleIndexField}/>
        </div>
        
        <div id="in">
            <p>Beans To Place</p>
            <input type="number" defaultValue={0} onChange={handleBeansField}/>
        </div>
        
        <div><button onClick={placeBeans}>Place Beans</button></div>
         
        </div>;
        </CenteredCard>
}

export default PlaceBeans;
