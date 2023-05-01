import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"
import { kycControllerABI } from "../../../../Smart Contracts Info/KycControllerInfo";
import KYCCard from './KYCCard/KYCCard';

const CircleKYC = (props)=> {

    useEffect(()=> {
          getRolesForKYC();
          
    }, [props.onPageSet]);

    const [kycAddress, setKycAddress] = useState('');
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

    const [kycRoles, setKycRoles] = useState([]);

    const getRolesForKYC = async ()=> {

        let kycController = await props.selectedInstance.kycController();
        setKycAddress(kycController);

        const instanceAddress = await props.selectedInstance.kycController();
        console.log(instanceAddress);

        const contract = new ethers.Contract(
            instanceAddress,
            kycControllerABI,
            props.connectedWalletInfo.provider
        );

        let ADMIN_ROLE = await contract.DEFAULT_ADMIN_ROLE();

        let hasAdminRole = await contract.hasRole(ADMIN_ROLE, props.connectedWalletInfo.account);

        console.log(hasAdminRole);
        let currentRoles = [];

        if (hasAdminRole) {
            currentRoles.push("Admin");
        }

        setKycRoles(currentRoles);
        return currentRoles;
    }

    let kycOutput;

    let isPresent = false;
    for (let i = 0; i < kycRoles.length; i++) {
        if (kycRoles[i] === "Admin") {
            isPresent = true;
        }
    }

    if (isPresent) {
        kycOutput = <div>
                        <div>
                        <p>Adds a wallet to the database and marks it as KYCed.</p>
                        <input type="text" placeholder="Wallet" onChange={handleUserToKycInput}/>
                        <div><button onClick={kycUser}>KYC Wallet</button></div>
                        </div>
                        <div>
                            <p>The KYC Admin Role holds the responsibility of adding new wallets to the database.</p>
                            <input type="text" placeholder="Wallet" onChange={handleKycAdmin}/>
                            <div><button onClick={setUserToKycAdmin}>Grant: Admin</button></div>
                        </div>
                    </div>
    } 


    let template = {
        title: "",
        description: "",
        value: ""
    }

    let isKYCRequired = kycAddress !== "0x0000000000000000000000000000000000000000" ? true : false;

    let kycRequiredCard = {
        title: "KYC Required",
        description: "Does this circle require contributors to be KYCed?",
        value: isKYCRequired ? "Yes" : "No"
    }

    let kycDatabaseCard = {
        title: "KYC address",
        description: "The smart contract containing the KYC database.",
        value: kycAddress
    }

    let output;

    if (isKYCRequired) {
        output = <div>
            <KYCCard info={kycDatabaseCard}></KYCCard>
            {kycOutput}
        </div>
    }

    return <div>

        <KYCCard info={kycRequiredCard}></KYCCard>
        { output }
        
        
        
        {/* <div className='tableContainer'>

<table>
            <tbody>
                <tr>
                    <th>What</th>
                    <th>Description</th>
                    <th>Value</th>
                    <th></th>
                </tr>
                    {
                        kycAddress === "0x0000000000000000000000000000000000000000" ? 
                            <tr>
                                <th>KYC Required</th>
                                <th>Does this circle require contributors to be KYCed?</th>
                                <th>NO</th>
                            </tr>
                                 : 
                            <tr>
                                <th>KYC Required</th>
                                <th>Does this circle require contributors to be KYCed?</th>
                                <th>YES</th>
                            </tr>
                    }
                    {
                        kycAddress !== "0x0000000000000000000000000000000000000000" ? 
                            <tr>
                                <th>KYC Address</th>
                                <th>The smart contract containing the KYC database.</th>
                                <th>{kycAddress} </th>
                                <th>
                                    {kycOutput}
                                </th>
                            </tr> : <tr></tr>
                    }
            </tbody>
        </table>
        </div> */}

    </div>
}

export default CircleKYC;