import "./CenteredCard.css";

const CenteredCard = (props)=> {
    const classes = 'centeredCard ' + props.className;
    return <div className={classes}><h1>{props.title}</h1>{props.children}</div>
}

export default CenteredCard;