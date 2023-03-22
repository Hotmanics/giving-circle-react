// import "./GeneralContractInfo.css";
import { ethers } from "ethers"
import React, { useState, useEffect } from "react";
import CenteredCard from "../Cards/Centered Card/CenteredCard";
import { factoryAddress, factoryABI } from "../../FactoryInfo";
import { implementationABI } from "../../ImplementationInfo";
import GivingCircleNavBar from "../GivingCircleNavBar/GivingCircleNavBar";

const GivingCircleInfo = (props)=> {

    useEffect(()=> {
        if (props.onPageSet) {
          getInfo();
        }
    }, [props.onPageSet]);

    const [phase, setPhase] = useState('');
    const [attendees, setAttendees] = useState([]);

    const getInfo = async ()=> {
        
        let phase = await props.selectedInstance.phase();

        if (phase === 0) {
            setPhase("Unitialized");

        } else if (phase === 1) {
            setPhase("Proposal Creation");
            
        } else if (phase === 2) {
            setPhase("Bean Placement");

        } else if (phase === 3) {
            setPhase("Gift Redemption");

        }

        let attendees = await props.selectedInstance.getAttendees();
        setAttendees(attendees);
    }

    return <CenteredCard title="Circle Info">
        <p>Address: { props.selectedInstance.address }</p>
        <p>Phase: { phase }</p>
        <p>Attendess: </p>

        <table>
            <tbody>


            <tr>
                <th>Address</th>
                <th>Beans</th>
            </tr>
            {
            attendees.map((value, index) => {
                console.log("printing value");
                return  <tr key={index}>
                            <th>{value.addr}</th>
                            <th>{value.beansAvailable.toNumber()}</th>
                        </tr>
                // <p key={index}>{value}</p>
                })
            }
            </tbody>
        </table>

        

        </CenteredCard>
}

export default GivingCircleInfo;
