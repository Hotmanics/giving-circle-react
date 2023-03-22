// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";

const GivingCircleFactory = (props)=> {

    const contract = new ethers.Contract(
        factoryAddress,
        factoryABI,
        props.connectedWalletInfo.provider
    );

    const [erc20Address, setErc20Address] = useState('');
    const handleErc20AdressChanged = async (event) => {
        setErc20Address(event.target.value);
    }

    const [kycAddress, setKycAddress] = useState('');
    const handleKycAddress = async (event) => {
        setKycAddress(event.target.value);
    }
    const [leaderInputFields, setLeaderInputFields] = useState([]);

    const handleLeaderChanged = (index, event)=> {
        let data = [...leaderInputFields];
        data[index] = event.target.value;
        setLeaderInputFields(data);
    }

    const addLeaderField = ()=> {
        let newfield = 'New Leader'
        setLeaderInputFields([...leaderInputFields, newfield]);
    }

    const [specialBeanPlacerInputFields, setSpecialBeanPlacerInputFields] = useState([]);

    const handleSpecialBeanPlacersChanged = (index, event)=> {
        let data = [...specialBeanPlacerInputFields];
        data[index] = event.target.value;
        setSpecialBeanPlacerInputFields(data);
    }

    const addBeanPlacerField = ()=> {
        let newfield = 'New Placer'
        setSpecialBeanPlacerInputFields([...specialBeanPlacerInputFields, newfield]);
    }

    const [specialGiftRedeemerInputFields, setSpecialGiftRedeemerInputFields] = useState([]);

    const handleSpecialGiftRedeemerChanged = (index, event)=> {
        let data = [...specialGiftRedeemerInputFields];
        data[index] = event.target.value;
        setSpecialGiftRedeemerInputFields(data);
    }

    const addGiftRedeemerField = ()=> {
        let newfield = 'New Redeemer'
        setSpecialGiftRedeemerInputFields([...specialGiftRedeemerInputFields, newfield]);
    }

    const submit = async (e) => {
        e.preventDefault();
        console.log(erc20Address);
        console.log(kycAddress);
        console.log(leaderInputFields);
        console.log(specialBeanPlacerInputFields);
        console.log(specialGiftRedeemerInputFields);
        console.log(numOfBeansToDisperse);
        console.log(fundingThreshold);

        let tx = await contract.createGivingCircle({
            beansToDispursePerAttendee: numOfBeansToDisperse,
            fundingThreshold: fundingThreshold,
            circleLeaders: leaderInputFields,
            specialBeanPlacers: specialBeanPlacerInputFields,
            specialGiftRedeemers: specialGiftRedeemerInputFields,
            erc20Token: erc20Address, //0xe6b8a5CF854791412c1f6EFC7CAf629f5Df1c747 - Mumbai USDC
            kycController: kycAddress === '' ? "0x0000000000000000000000000000000000000000" : kycAddress, //0x0000000000000000000000000000000000000000 - Zero Address
          });
        
        await tx.wait();
        console.log("done!");
    }

    // const contract = new ethers.Contract(
    //     address,
    //     repTokensABI,
    //     props.connectedWalletInfo.provider
    // );

    const [ numOfBeansToDisperse, setNumOfBeansToDisperse] = useState(0);
    const handleNumberOfBeansDispersed = async (event) => {
        setNumOfBeansToDisperse(event.target.value);
    }

    const [ fundingThreshold, setFundingThreshold] = useState(0);
    const handleFundingThreshold = async (event) => {
        setFundingThreshold(event.target.value);
    }

    const [implementation, setImplementation] = useState('');
    const handleImplementationChanged = async (event) => {
        setImplementation(event.target.value);
    }
    const setImplemenetationToChain = async () => {
        // let tx = await contract.setImplementation(implementation);
        // await tx.wait();
    }

    return <CenteredCard title="Giving Circle Factory">

        <h1>Factory Settings</h1>
        <p>Implementation</p>
        <input type="text" onChange={handleImplementationChanged}/>
        <div><button onClick={setImplemenetationToChain}>Set</button></div>
        <h1>Create New Giving Circle</h1>
        <p>ERC20 Address</p>
        <input type="text" onChange={handleErc20AdressChanged}/>

        <p>KYC Address</p>
        <input type="text" onChange={handleKycAddress}/>

        <p>Number Of Beans To Disperse</p>
        <input type="number" onChange={handleNumberOfBeansDispersed}/>

        <p>Funding Threshold</p>
        <input type="number" onChange={handleFundingThreshold}/>

        <p>Leaders</p>
        <div><button onClick={addLeaderField}>Add more...</button></div>

        {
            leaderInputFields.map((input, index) => {
            return (
                <div key={index}>
                    <input
                        name ="leader"
                        placeholder="Leader"
                        value={input.name}
                        onChange= {event => handleLeaderChanged(index, event)}
                    />
                </div>    
            )})
        }

        <p>Special Bean Placers</p>
        <div><button onClick={addBeanPlacerField}>Add more...</button></div>

        {
            specialBeanPlacerInputFields.map((input, index) => {
            return (
                <div key={index}>
                    <input
                        name ="placer"
                        placeholder="placer"
                        value={input.name}
                        onChange= {event => handleSpecialBeanPlacersChanged(index, event)}
                    />
                </div>    
            )})
        }

        <p>Special Gift Redeemers</p>
        <div><button onClick={addGiftRedeemerField}>Add more...</button></div>

        {
            specialGiftRedeemerInputFields.map((input, index) => {
            return (
                <div key={index}>
                    <input
                        name ="redeemer"
                        placeholder="gift redeemer"
                        value={input.name}
                        onChange= {event => handleSpecialGiftRedeemerChanged(index, event)}
                    />
                </div>    
            )})
        }
        
        
        <div><button onClick={submit}>Create New Circle</button></div>
        </CenteredCard>
}

export default GivingCircleFactory;
