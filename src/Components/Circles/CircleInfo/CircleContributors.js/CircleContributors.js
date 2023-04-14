import React, { useState } from 'react';
import { ethers } from "ethers"

const CircleContributors = (props)=> {

    const [proposals, setProposals] = useState([]);
    const [decimals, setDecimals] = useState('');

    const get = async ()=> {
        let decimals = await props.erc20Contract.decimals();
        setDecimals(decimals);

        let proposals = await props.selectedInstance.getProposals();
        setProposals(proposals);
    }

    get();

    return <div>
<h2>Contributors: </h2>
        <p>People who have dedicate time/energy/resources to the DAO.</p>
        <table>
            <tbody>
            <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Address (Wallet)</th>
                <th>Contributions</th>
                <th>Beans Received</th>
                <th>Gift Amount</th>
                <th>Redeemed</th>
            </tr>
            {
                proposals.map((value, index) => {
                return  <tr key={index}>
                            <th>{index}</th>
                            <th>{value.contributor.name}</th>
                            <th>{value.contributor.addr}</th>
                            <th>{value.contributor.contributions}</th>
                            <th>{value.beansReceived.toNumber()}</th>
                            <th>{ethers.utils.formatUnits(value.contributor.fundsAllocated.toNumber(), decimals)}</th>
                            <th>{value.contributor.hasRedeemed.toString()}</th>
                        </tr>
                })
            }
            </tbody>
        </table>
    </div>
}

export default CircleContributors;