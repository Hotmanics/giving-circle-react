import "./BeanCard.css";

const BeanCard = (props)=> {

    const handleAmountFieldChange = (index, event) => {
        props.onAmountFieldChange(index, event);
    }

    return <div className='beanCard'>
        <h2>{props.info.contributor.name}</h2>
        <p>{ props.info.contributor.addr}</p>
        <h3>Contributions</h3>
        <p>{props.info.contributor.contributions}</p>
        <input
            name="amount"
            placeholder="Beans"
            onChange={event => handleAmountFieldChange(props.index, event)}
        />
    </div>
}

export default BeanCard;