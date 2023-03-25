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
        let tx = await props.selectedInstance.redeemMyGift();
        await tx.wait();
        console.log("redeemed gift!!");
    }

    const redeemAllGifts = async ()=> {
        let proposals = await props.selectedInstance.getProposals();

        let proposalAddresses = [];
        
        for (let i = 0; i < proposals.length; i++) {
            proposalAddresses.push(proposals[i].proposer);
        }

        let tx = await props.selectedInstance.redeemGiftForSomeoneMultiple(proposalAddresses);
        await tx.wait();
        console.log("Redeemed Gifts!");
    }

    const [withdrawRemainingFundsInput, setWithdrawRemainingFundsInput] = useState();

    const handleWithdrawRemainingFundsInputChanged = (event)=> {
        setWithdrawRemainingFundsInput(event.target.value);
    }

    const withdrawRemainingFunds = async ()=> {
        let tx = await props.selectedInstance.withdrawRemainingFunds(withdrawRemainingFundsInput);
        await tx.wait();
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
