import "./CenteredCard.css";

const CenteredCard = (props)=> {
    const classes = 'centeredCard ' + props.className;
    return <div className={classes}><h2>{props.title}</h2>{props.children}</div>
}

export default CenteredCard;