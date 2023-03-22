import "./LeftCard.css";

const LeftCard = (props)=> {
    const classes = 'leftCard ' + props.className;
    return <div className={classes}>{props.children}</div>
}

export default LeftCard;