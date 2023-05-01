import "./FactoryCard.css";

const FactoryCard = (props)=> {

    let customRendering;
    if (props.customRendering !== undefined) {
        customRendering = props.customRendering;
    }

    return <div className='factoryCard'>
        <h2>{props.info.title}</h2>
        <p>{props.info.description}</p>
        <p id="value">{ props.info.value}</p>
        {
            customRendering
        }

    </div>
}

export default FactoryCard;