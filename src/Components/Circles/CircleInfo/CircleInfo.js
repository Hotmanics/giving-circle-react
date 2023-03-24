import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import "./CircleInfo.css";
import { ethers } from "ethers"
import { PartialIERC20InfoABI } from "../../../Smart Contracts Info/IPartialERC20Info";

const CircleInfo = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [phase, setPhase] = useState('');
    const [attendees, setAttendees] = useState([]);
    const [proposals, setProposals] = useState([]);

    const [erc20TokenAddress, setERC20TokenAddress] = useState('');
    const [fundedAmount, setFundedAMount] = useState('');

    const [minFundAmount, setMinFundAmount] = useState('');
    const [yourERC20Balance, setYourERC20Balance] = useState(0);

    const [decimals, setDecimals] = useState(0);
    const [isKycRequired, setIsKycRequired] = useState('false');
    const [kycAddress, setKycAddress] = useState('');

    const getInfo = async ()=> {
        
        let phase = await props.selectedInstance.phase();

        if (phase === 0) {
            setPhase("Unitialized");

        } else if (phase === 1) {
            setPhase("Proposal Creation");
            
        } else if (phase === 2) {
            setPhase("Bean Placement");

        } else if (phase === 3) {
            setPhase("Gift Redemption");
        }

        let attendees = await props.selectedInstance.getAttendees();
        setAttendees(attendees);

        let proposals = await props.selectedInstance.getProposals();
        setProposals(proposals);

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

        let kycController = await props.selectedInstance.kycController();
        setKycAddress(kycController);
    }

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
        let tx = await contract.transfer(props.selectedInstance.address, fundBig);
        await tx.wait();
        console.log("Added Funds!");


        let fundedAm = await contract.balanceOf(props.selectedInstance.address);
        fundedAm = ethers.utils.formatUnits(fundedAm, decimals);
        setFundedAMount(fundedAm);

    }


    return <CenteredCard title="Info">
        <p>Add Funds</p>
        <input type="number" onChange={handleFundAmount}/>
        <button onClick={addFunds}>Add</button>

        <table>
            <tbody>
                <tr>
                    <th>Address</th>
                    <th>{ props.selectedInstance.address }</th>
                </tr>
                <tr>    
                    <th>ERC20 Token</th>
                    <th>{ erc20TokenAddress }</th>
                </tr>   
                    {
                        kycAddress === "0x0000000000000000000000000000000000000000" ? 
                            <tr><th>KYC Required</th><th>false</th></tr> : <tr><th>KYC Required</th><th>true</th></tr>
                    }
                    {
                        kycAddress !== "0x0000000000000000000000000000000000000000" ? 
                            <tr><th>KYC Address</th><th>{kycAddress} </th></tr> : <tr></tr>
                    }
                <tr>
                    <th>Min Fund Amount</th>
                    <th>{minFundAmount}</th>
                </tr>
                <tr>
                    <th>Funded Amount</th>
                    <th>{fundedAmount }</th>
                </tr>               
                <tr>
                    <th>Your Balance</th>
                    <th>{ yourERC20Balance}</th>
                </tr>
                <tr>
                    <th>Phase</th>
                    <th>{ phase }</th>
                </tr>
            </tbody>
        </table>


        <h2>Attendess: </h2>
        <table>
            <tbody>
            <tr>
                <th>Address</th>
                <th>Placeable Beans</th>
            </tr>
            {
                attendees.map((value, index) => {
                return  <tr key={index}>
                            <th>{value.addr}</th>
                            <th>{value.beansAvailable.toNumber()}</th>
                        </tr>
                })
            }
            </tbody>
        </table>

        <h2>Proposers: </h2>
        <table>
            <tbody>
            <tr>
                <th>Index</th>
                <th>Address</th>
                <th>Beans Received</th>
                <th>Gift Amount</th>
                <th>Redeemed</th>
            </tr>
            {
                proposals.map((value, index) => {
                return  <tr key={index}>
                            <th>{index}</th>
                            <th>{value.proposer}</th>
                            <th>{value.beansReceived.toNumber()}</th>
                            <th>{ethers.utils.formatUnits(value.giftAmount, decimals)}</th>
                            <th>{value.hasRedeemed.toString()}</th>
                        </tr>
                })
            }
            </tbody>
        </table>
        </CenteredCard>
}

export default CircleInfo;