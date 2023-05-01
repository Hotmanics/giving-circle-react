import "./ContributorCard.css";
import { ethers } from "ethers"

const ContributorCard = (props)=> {

    return <div className='contributorCard'>
        <h3>Name</h3>
        <p>{props.proposal.contributor.name}</p>
        <h3>Address</h3>
        <p>{props.proposal.contributor.addr}</p>
        <h3>Contributions</h3>
        <p>{props.proposal.contributor.contributions}</p>
        
        <h3>Other</h3>
        <p>Beans Received: {props.proposal.beansReceived.toNumber()}</p>
        <p>Funds Allocated: {ethers.utils.formatUnits(props.proposal.contributor.fundsAllocated.toNumber(), props.decimals)}</p>
        <p>Has Redeemed: {props.proposal.contributor.hasRedeemed.toString()}</p>
        
    </div>
}

export default ContributorCard;