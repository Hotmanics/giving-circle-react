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

    //USDC Mumbai - 0x0FA8781a83E46826621b3BC094Ea2A0212e71B23
    //KYC Mumbai - 0x4989649CA2C77727CB1ceD8e5E79591d5Efbc6AD
    const [erc20Address, setErc20Address] = useState('0x0FA8781a83E46826621b3BC094Ea2A0212e71B23');
    const handleErc20AdressChanged = async (event) => {
        setErc20Address(event.target.value);
    }

    const [kycAddress, setKycAddress] = useState('0x4989649CA2C77727CB1ceD8e5E79591d5Efbc6AD');
    const handleKycAddress = async (event) => {
        setKycAddress(event.target.value);
    }

    const [nameInputField, setNameInputField] = useState('');
    const handleNameChanged = async (event) => {
        setNameInputField(event.target.value);
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
        let erc20Contract;
        let decimals;

        try{

        erc20Contract = new ethers.Contract(
            erc20Address,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        decimals = await erc20Contract.decimals();

        } catch (e) {
            props.onBoastMessage("You did not supply an erc20 Token!");
        }

        console.log(fundingThreshold);
        let final = ethers.utils.parseUnits(fundingThreshold.toString(), decimals)

        try {
            let tx = await contract.createGivingCircle({
                name: nameInputField,
                beansToDispursePerAttendee: numOfBeansToDisperse,
                fundingThreshold: final,
                circleLeaders: leaderInputFields,
                beanPlacementAdmins: specialBeanPlacerInputFields,
                fundsManagers: specialGiftRedeemerInputFields,
                erc20Token: erc20Address,
                kycController: kycAddress === '' ? "0x0000000000000000000000000000000000000000" : kycAddress, //0x0000000000000000000000000000000000000000 - Zero Address
            });

        let circleCount = await contract.instancesCount();

        if (nameInputField.length === 0) {
            props.onBoastMessage(`Creating Giving Circle: ${circleCount.toNumber() + 1}...`);

        } else {
            props.onBoastMessage(`Creating Giving Circle: ${nameInputField}...`);
        }

        await tx.wait();

        if (nameInputField.length === 0) {
            props.onBoastMessage(`Created Giving Circle: ${circleCount.toNumber() + 1}!`);

        } else {
            props.onBoastMessage(`Created Giving Circle: ${nameInputField}!`);
        }

        } catch (e) {
            props.onBoastMessage(e.reason);
        }

        
    }

    return <CenteredCard className="factoryInteractions" title="Create New Giving Cirlce">

    <div>
    <a href="https://faucet.polygon.technology/" target={"#"}>Polygon Testnet Faucet</a>
    </div>
    <div>
    <table>
            <tbody>
                <tr>
                    <th>What</th>
                    <th id="description">Description</th>
                    <th>Value</th>
                    <th></th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>A descriptive name used to identify the Giving Circle.</th>
                    <th><input id="nameField" name ="name" placeholder="Giving Circle Name" onChange= {handleNameChanged}/></th>
                </tr>

                <tr>
                    <th>Beans To Disperse Per Attendee</th>
                    <th>The number of beans that get dispersed to each attendee.</th>
                    <th><input type="number" defaultValue={numOfBeansToDisperse} onChange={handleNumberOfBeansDispersed}/></th>
                </tr>

                <tr>
                    <th>Funding Threshold</th>
                    <th>The minimum required amount of tokens that need to be transferred to the Giving Circle before it can progress to the gift redemption phase. </th>
                    <th><input type="number" defaultValue={0} onChange={handleFundingThreshold}/></th>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <div id="in">

            <p>Leaders</p>
            <p>This role allows wallets to progress Giving Circles through its phases.</p>
            <div><button onClick={addLeaderField}>Add more...</button></div>

            {
                leaderInputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name ="leader"
                            placeholder="Wallet"
                            value={input.name}
                            onChange= {event => handleLeaderChanged(index, event)}
                        />
                    </div>    
                )})
            }
        </div>

        <div id="in">

            <p>Bean Placement Admins</p>
            <p>This role allows wallets to place beans on behalf of other wallets</p>

            <div><button onClick={addBeanPlacerField}>Add more...</button></div>

            {
                specialBeanPlacerInputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name ="placer"
                            placeholder="Wallet"
                            value={input.name}
                            onChange= {event => handleSpecialBeanPlacersChanged(index, event)}
                        />
                    </div>    
                )})
            }

        </div>

        <div id="in">
            <p>Fund Managers</p>
            <p>This role allows wallets to redeem gifts on behalf of other wallets.</p>
            <div><button onClick={addGiftRedeemerField}>Add more...</button></div>

            {
                specialGiftRedeemerInputFields.map((input, index) => {
                return (
                    <div key={index}>
                        <input
                            name ="redeemer"
                            placeholder="Wallet"
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
