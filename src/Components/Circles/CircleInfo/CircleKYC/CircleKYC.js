import React, { useState, useEffect } from 'react';
import { ethers } from "ethers"
import { kycControllerABI } from "../../../../Smart Contracts Info/KycControllerInfo";

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
                        <div id="in">
                        Adds a wallet to the database and marks it as KYCed.
                        <input type="text" placeholder="Wallet" onChange={handleUserToKycInput}/>
                        <button onClick={kycUser}>KYC Wallet (KYC Admin)</button>
                        </div>
                        <div id="in">
                            The KYC Admin Role holds the responsibility of adding new wallets to the database.
                            <input type="text" placeholder="Wallet" onChange={handleKycAdmin}/>
                            <button onClick={setUserToKycAdmin}>Grant: KYC Admin Role (KYC Admin)</button>
                        </div>
                    </div>
    } 



    return <div>
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
    </div>
}

export default CircleKYC;