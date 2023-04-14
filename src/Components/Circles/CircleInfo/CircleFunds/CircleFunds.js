import React, { useState } from 'react';
import { ethers } from "ethers"
import { PartialIERC20InfoABI } from "../../../../Smart Contracts Info/IPartialERC20Info";

const CircleFunds = (props)=> {

    const [proposals, setProposals] = useState([]);

    const [erc20TokenAddress, setERC20TokenAddress] = useState('');
    const [fundedAmount, setFundedAMount] = useState('');

    const [minFundAmount, setMinFundAmount] = useState('');
    const [yourERC20Balance, setYourERC20Balance] = useState(0);

    const [decimals, setDecimals] = useState(0);

    const [leftOverFunds, setLeftoverFunders] = useState(99);
    const[totalRedeemedFunds, setTotalRedeemedFunds] = useState(99);
    const [totalUnredeemedFunds, setTotalUnredeemedFunds] = useState(99);
    const[totalAllocatedFunds, setTotalAllocatedFunds] = useState(99);

    const [addFundsAmount, setAddFundsAmount] = useState(0);

    const handleFundAmount = (event)=> {
        setAddFundsAmount(event.target.value);
    }

    const addFunds = async ()=> {

        const instanceAddress = await props.selectedInstance.erc20Token();

        const contract = new ethers.Contract(
            instanceAddress,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        console.log(addFundsAmount);
            
        let decimals = await contract.decimals();

        let fundBig = ethers.utils.parseUnits(addFundsAmount, decimals);
        console.log(fundBig.toNumber());
        try {
            let tx = await contract.transfer(props.selectedInstance.address, fundBig);
            props.onBoastMessage("Adding " + addFundsAmount + " token(s) to circle...");
            await tx.wait();
            props.onBoastMessage("Added " + addFundsAmount + " token(s) to circle!");
        } catch (e) {
            if (e.reason === "execution reverted: ERC20: transfer amount exceeds balance") {
                props.onBoastMessage(`You attempted to fund the circle with ${addFundsAmount} tokens but you only have ${yourERC20Balance}!`);
            }
        }

        let fundedAm = await contract.balanceOf(props.selectedInstance.address);
        fundedAm = ethers.utils.formatUnits(fundedAm, decimals);
        setFundedAMount(fundedAm);
    }
    
    const get = async ()=> {

        const instanceAddress = await props.selectedInstance.erc20Token();

        const contract = new ethers.Contract(
            instanceAddress,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        setERC20TokenAddress(instanceAddress);

        let decimals = await contract.decimals();
        setDecimals(decimals);

        let fundedAm = await contract.balanceOf(props.selectedInstance.address);
        fundedAm = ethers.utils.formatUnits(fundedAm, decimals);
        setFundedAMount(fundedAm);

        let minFundAmount = await props.selectedInstance.fundingThreshold();
        minFundAmount = ethers.utils.formatUnits(minFundAmount, decimals);
        setMinFundAmount(minFundAmount);

        let yourAmount = await contract.balanceOf(props.connectedWalletInfo.account);
        yourAmount = ethers.utils.formatUnits(yourAmount, decimals);
        setYourERC20Balance(yourAmount);

        let totalAll = await props.selectedInstance.getTotalAllocatedFunds();
        setTotalAllocatedFunds(ethers.utils.formatUnits(totalAll, decimals));

        let totalUnredeemed = await props.selectedInstance.getTotalUnredeemedFunds();
        setTotalUnredeemedFunds(ethers.utils.formatUnits(totalUnredeemed, decimals));

        let totalRedeemed = await props.selectedInstance.getTotalRedeemedFunds();
        setTotalRedeemedFunds(ethers.utils.formatUnits(totalRedeemed, decimals));

        let leftOverFunds = await props.selectedInstance.getLeftoverFunds();
        setLeftoverFunders(ethers.utils.formatUnits(leftOverFunds, decimals));
    }

    get();

    return <div>
<table>
            <tbody>
                <tr>
                    <th>What</th>
                    <th>Description</th>
                    <th>Value</th>
                    <th></th>
                </tr>

                <tr>    
                    <th>USDC</th>
                    <th>The smart contract of USDC used for funding.</th>
                    <th>{ erc20TokenAddress }</th>
                </tr>   
                <tr>
                    <th>Min Fund Amount</th>
                    <th>The minimum amount of funds for the Giving Circle to be able to progress to the gift redemption phase.</th>
                    <th>{minFundAmount}</th>
                </tr>
                <tr>
                    <th>Funded Amount</th>
                    <th>The current USDC balance of the smart contract </th>
                    <th>
                        {fundedAmount } 
                    </th>
                 
                </tr>               
                <tr>
                    <th>Your Balance</th>
                    <th>Your current USDC balance. </th>
                    <th>{ yourERC20Balance}</th>
                    <th>
                        <div id="in">
                        <input  defaultValue={0} type="number" onChange={handleFundAmount}/>
                        <button onClick={addFunds}>Add Funds To Circle</button>
                        </div>    
                    </th>
                </tr>
                <tr>
                    <th>Leftover Funds</th>
                    <th>Extra funds that are not allocated anywhere.</th>
                    <th>{ leftOverFunds }</th>
                </tr>


                <tr>
                    <th>Total Redeemed Funds</th>
                    <th>The total amount of funds that have been currently redeemed.</th>
                    <th>{ totalRedeemedFunds }</th>
                </tr>


                <tr>
                    <th>Total Unredeemed Funds</th>
                    <th>The total amount of funds that have not yet been redeemed.</th>
                    <th>{ totalUnredeemedFunds }</th>
                </tr>


                <tr>
                    <th>Total Allocated Funds</th>
                    <th>The total number of funds allocated to contributors.</th>
                    <th>{ totalAllocatedFunds }</th>
                </tr>

            </tbody>
        </table>
    </div>
}

export default CircleFunds;