import "./KYCCard.css";

const KYCCard = (props)=> {

    return <div className='kycCard'>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        <p id="value">{ props.info.value}</p>
    </div>
}

export default KYCCard;