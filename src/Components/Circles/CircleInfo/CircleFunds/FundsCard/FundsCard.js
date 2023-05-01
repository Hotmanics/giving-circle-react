import "./FundsCard.css";

const FundsCard = (props)=> {

    return <div className='fundsCard'>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        <p id="value">{ props.info.value}</p>
    </div>
}

export default FundsCard;