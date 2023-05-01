import "./AttendeeCard.css";

const AttendeeCard = (props)=> {

    return <div className='attendeeCard'>
        <p>{props.attendee.addr}</p>
        <p>Placeable Beans: {props.attendee.beansAvailable.toNumber()}</p>
    </div>
}

export default AttendeeCard;