// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../../../Cards/Centered Card/CenteredCard";
import { PartialIERC20InfoABI } from "../../../../Smart Contracts Info/IPartialERC20Info";

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
                console.log(proposals[i]);

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

    return <CenteredCard title="Gift Redemption">
                <div>
                    <p>Your Redeemable Amount: {amountToRedeem}</p>
                    <div><button onClick={redeemMyGift}>Redeem</button></div>
                    <div><button onClick={redeemAllGifts}>Redeem All (Leader)</button></div>
                </div>;
            </CenteredCard>
}

export default GiftRedeem;
