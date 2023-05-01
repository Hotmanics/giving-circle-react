import "./InfoCard.css";

const InfoCard = (props)=> {

    return <div className='infoCard'>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        <p id="value">{ props.info.value}</p>
    </div>
}

export default InfoCard;