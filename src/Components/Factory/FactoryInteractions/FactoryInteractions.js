import { ethers } from "ethers"
import React, { useState } from "react";
import CenteredCard from "../../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../../Smart Contracts Info/FactorySmartContractInfo";
import { PartialIERC20InfoABI } from "../../../Smart Contracts Info/IPartialERC20Info";
import "./FactoryInteractions.css";

const FactoryInteractions = (props)=> {

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


    const [ numOfBeansToDisperse, setNumOfBeansToDisperse] = useState(0);
    const handleNumberOfBeansDispersed = async (event) => {
        setNumOfBeansToDisperse(event.target.value);
    }

    const [ fundingThreshold, setFundingThreshold] = useState(0);
    const handleFundingThreshold = async (event) => {
        setFundingThreshold(event.target.value);
    }

    const submit = async (e) => {
        e.preventDefault();

        const erc20Contract = new ethers.Contract(
            erc20Address,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        let decimals = await erc20Contract.decimals();
        let final = ethers.utils.parseUnits(fundingThreshold, decimals)

        let tx = await contract.createGivingCircle({
            beansToDispursePerAttendee: numOfBeansToDisperse,
            fundingThreshold: final,
            circleLeaders: leaderInputFields,
            beanPlacementAdmins: specialBeanPlacerInputFields,
            fundsManagers: specialGiftRedeemerInputFields,
            erc20Token: erc20Address,
            kycController: kycAddress === '' ? "0x0000000000000000000000000000000000000000" : kycAddress, //0x0000000000000000000000000000000000000000 - Zero Address
          });
        
        props.onBoastMessage("Creating Giving Circle...");
        await tx.wait();
        props.onBoastMessage("Created Giving Circle!");
    }

    return <CenteredCard className="factoryInteractions" title="Create New Giving Cirlce">

    <div>
        <div id="in">

        <p>ERC20 Address</p>
        <input type="text" onChange={handleErc20AdressChanged}/>

        </div>
        <div id="in">

        <p>KYC Address</p>
        <input type="text" onChange={handleKycAddress}/>

        </div>
        <div id="in">

        <p>Beans To Disperse Per Person</p>
        <input type="number" onChange={handleNumberOfBeansDispersed}/>

        </div>
        <div id="in">

        <p>Funding Threshold</p>
        <input type="number" onChange={handleFundingThreshold}/>

        </div>
    </div>

    <div>
        <div id="in">

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
        </div>

        <div id="in">

            <p>Bean Placement Admins</p>
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

        </div>

        <div id="in">
            <p>Fund Managers</p>
            <div><button onClick={addGiftRedeemerField}>Add more...</button></div>

            {
                specialGiftRedeemerInputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name ="redeemer"
                            placeholder="Fund Manager"
                            value={input.name}
                            onChange= {event => handleSpecialGiftRedeemerChanged(index, event)}
                        />
                    </div>    
                )})
            }
        </div>
    </div>

        <div><button className="semiBigButton" onClick={submit}>Create New Circle</button></div>
        </CenteredCard>
}

export default FactoryInteractions;
