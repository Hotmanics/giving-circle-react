// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import { PartialIERC20InfoABI } from "../../../../Smart Contracts Info/IPartialERC20Info";
import "./GiftRedeem.css";

const GiftRedeem = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [amountToRedeem, setAmountToRedeem] = useState(0);

    const getInfo = async ()=> {

        const instanceAddress = await props.selectedInstance.erc20Token();

        const contract = new ethers.Contract(
            instanceAddress,
            PartialIERC20InfoABI,
            props.connectedWalletInfo.provider
        );

        let decimals = await contract.decimals();

        let proposals = await props.selectedInstance.getProposals();
        for (let i = 0; i < proposals.length; i++) {
            if (proposals[i].proposer === props.connectedWalletInfo.account) {

                let amount = 0;

                if (proposals[i].hasRedeemed) {
                    amount = 0;
                } else {
                    amount = ethers.utils.formatUnits(proposals[i].giftAmount, decimals);
                }

                setAmountToRedeem(amount);

            }
        }


    }

    const redeemMyGift = async ()=> {
        try {
            let tx = await props.selectedInstance.redeemMyGift();
            props.onBoastMessage("Redeeming My Gift...");
            await tx.wait();
            props.onBoastMessage("Redeemed My Gift!");
        } catch (e) {
            props.onBoastMessage(e.reason);
        }
    }

    const redeemAllGifts = async ()=> {
        let proposals = await props.selectedInstance.getProposals();

        let proposalAddresses = [];
        
        for (let i = 0; i < proposals.length; i++) {
            proposalAddresses.push(proposals[i].proposer);
        }

        let role = await props.selectedInstance.FUNDS_MANAGER_ROLE();

        try {
            let tx = await props.selectedInstance.redeemGiftForSomeoneMultiple(proposalAddresses);
            props.onBoastMessage("Redeeming gifts for several people...");
            await tx.wait();
            props.onBoastMessage("Redeemed gifts for several people!");
        } catch (e) {
            if (e.reason === `execution reverted: AccessControl: account ${props.connectedWalletInfo.account.toLowerCase()} is missing role ${role}`) {
                props.onBoastMessage("You do not have access to redeem funds for others!");
            } else {
                props.onBoastMessage(e.reason);
            }
        }
    }

    const [withdrawRemainingFundsInput, setWithdrawRemainingFundsInput] = useState();

    const handleWithdrawRemainingFundsInputChanged = (event)=> {
        setWithdrawRemainingFundsInput(event.target.value);
    }

    const withdrawRemainingFunds = async ()=> { 
        try{
            let tx = await props.selectedInstance.withdrawRemainingFunds(withdrawRemainingFundsInput);
            props.onBoastMessage("Withdrawing funds to " + withdrawRemainingFundsInput + "...");
            await tx.wait();
            props.onBoastMessage("Withdrew funds to " + withdrawRemainingFundsInput + "!");
    
        } catch (e) {
            props.onBoastMessage("Please enter a valid address!");
        }
    }



    return <CenteredCard className="giftRedeem" title="Gift Redemption">
                <div>
                    <p>Your Redeemable Amount: {amountToRedeem}</p>
                    <div><button className="semiBigButton" onClick={redeemMyGift}>Redeem</button></div>
                    <div><button className="semiBigButton" onClick={redeemAllGifts}>Courtest Redeem All (Funds Manager)</button></div>

    <br/>
    <br/>
                    <input
                        name ="target"
                        placeholder="Target"
                        onChange= {handleWithdrawRemainingFundsInputChanged}
                    />
                    <p>Can also be used to roll over funds to a new circle</p>

                    <div><button className="semiBigButton" onClick={withdrawRemainingFunds}>Withdraw Remaining Funds (Funds Manager)</button></div>
                </div>;
            </CenteredCard>
}

export default GiftRedeem;
