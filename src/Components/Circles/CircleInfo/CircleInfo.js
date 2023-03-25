import React, { useState, useEffect } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { ethers } from "ethers"
import { PartialIERC20InfoABI } from "../../../Smart Contracts Info/IPartialERC20Info";
import { kycControllerABI } from "../../../Smart Contracts Info/KycControllerInfo";

import "./CircleInfo.css";

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

    const [totalBeansDispursed, setTotalBeansDispursed] = useState(99);
    const [leftOverFunds, setLeftoverFunders] = useState(99);
    const[totalRedeemedFunds, setTotalRedeemedFunds] = useState(99);
    const [totalUnredeemedFunds, setTotalUnredeemedFunds] = useState(99);
    const[totalAllocatedFunds, setTotalAllocatedFunds] = useState(99);
    const [totalBeansToDispurse, setTotalBeansToDispurse] = useState(99);


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

        let totalAll = await props.selectedInstance.getTotalAllocatedFunds();
        setTotalAllocatedFunds(ethers.utils.formatUnits(totalAll, decimals));

        let totalUnredeemed = await props.selectedInstance.getTotalUnredeemedFunds();
        setTotalUnredeemedFunds(ethers.utils.formatUnits(totalUnredeemed, decimals));

        let totalRedeemed = await props.selectedInstance.getTotalRedeemedFunds();
        setTotalRedeemedFunds(ethers.utils.formatUnits(totalRedeemed, decimals));

        let totalBeansDispursed = await props.selectedInstance.getTotalBeansDispursed();
        setTotalBeansDispursed(totalBeansDispursed.toNumber());

        let leftOverFunds = await props.selectedInstance.getLeftoverFunds();
        setLeftoverFunders(ethers.utils.formatUnits(leftOverFunds, decimals));

        let totalBeansToDispurse = await props.selectedInstance.beansToDispursePerAttendee();
        setTotalBeansToDispurse(totalBeansToDispurse.toNumber());
    }

    const [userToKyc, setUserToKyc] = useState('');

    const handleUserToKycInput = (event) => {
        setUserToKyc(event.target.value);
    }

    const kycUser = async () => {
        const instanceAddress = await props.selectedInstance.kycController();

        const contract = new ethers.Contract(
            instanceAddress,
            kycControllerABI,
            props.connectedWalletInfo.provider
        );

        try{
            let tx = await contract.kycUser(userToKyc);
            props.onBoastMessage(`kycing ${userToKyc}...`);
            await tx.wait();
            props.onBoastMessage(`kyced ${userToKyc}!`);
        } catch (e) {
            if (e.reason === `execution reverted: AccessControl: account ${await props.connectedWalletInfo.account.toLowerCase()} is missing role ${await contract.DEFAULT_ADMIN_ROLE()}`) {
                props.onBoastMessage("You do not have the right to KYC users!");
            } else {
                props.onBoastMessage("Please enter a valid address!");
            }
        }
    }   

    const [kycAdmin, setKycAdmin] = useState('');


    const handleKycAdmin = (event) => {
        setKycAdmin(event.target.value);
    }

    const setUserToKycAdmin = async () => {
        const instanceAddress = await props.selectedInstance.kycController();

        const contract = new ethers.Contract(
            instanceAddress,
            kycControllerABI,
            props.connectedWalletInfo.provider
        );

        try{
            let role = await contract.DEFAULT_ADMIN_ROLE();
            let tx = await contract.grantRole(role, kycAdmin);
            props.onBoastMessage(`Giving ${kycAdmin} KYC admin role...`);
            await tx.wait();
            props.onBoastMessage(`Gave ${kycAdmin} KYC admin role!`);
        } catch (e) {
            if (e.reason === `execution reverted: AccessControl: account ${await props.connectedWalletInfo.account.toLowerCase()} is missing role ${await contract.DEFAULT_ADMIN_ROLE()}`) {
                props.onBoastMessage("You do not have the right grant KYC admins!");
            } else {
                props.onBoastMessage("Please enter a valid address!");
            }
        }
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


    return <CenteredCard className="circleInfo" title="Info">
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
                        kycAddress !== "0x0000000000000000000000000000000000000000" ? <tr><th>KYC Address</th><th>{kycAddress} </th><th><div id="in"><input type="text" onChange={handleUserToKycInput}/><button onClick={kycUser}>KYC User</button></div><div id="in"><input type="text" onChange={handleKycAdmin}/><button onClick={setUserToKycAdmin}>Grant KYC Admin</button></div></th></tr> : <tr></tr>
                    }
                <tr>
                    <th>Min Fund Amount</th>
                    <th>{minFundAmount}</th>
                </tr>
                <tr>
                    <th>Funded Amount</th>
                    <th>
                        {fundedAmount } 
                    </th>
                 
                </tr>               
                <tr>
                    <th>Your Balance</th>
                    <th>{ yourERC20Balance}</th>
                    <th>
                        <div id="in">
                        <input  defaultValue={0} type="number" onChange={handleFundAmount}/>
                        <button onClick={addFunds}>Add Funds To Circle</button>
                        </div>    
                    </th>
                </tr>
                <tr>
                    <th>Phase</th>
                    <th>{ phase }</th>
                </tr>


                <tr>
                    <th>Total Beans To Dispurse</th>
                    <th>{ totalBeansToDispurse }</th>
                </tr>

                <tr>
                    <th>Total Beans Dispursed</th>
                    <th>{ totalBeansDispursed }</th>
                </tr>


                <tr>
                    <th>Leftover Funds</th>
                    <th>{ leftOverFunds }</th>
                </tr>


                <tr>
                    <th>Total Redeemed Funfs</th>
                    <th>{ totalRedeemedFunds }</th>
                </tr>


                <tr>
                    <th>Total Unredeemed Funds</th>
                    <th>{ totalUnredeemedFunds }</th>
                </tr>


                <tr>
                    <th>Total Allocated Funds</th>
                    <th>{ totalAllocatedFunds }</th>
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