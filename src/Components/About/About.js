import React, { useState } from 'react';
import "./About.css";

const About = (props)=> {
    return <div className="about">
            <div>
                <h1>Welcome</h1>
                <p>Giving Circles are a way to record DAO members' contributions and have them rewarded based on their efforts. All done entirely on-chain.</p>
            </div>
            <div>
                <h2>Giving Circles</h2>
                <p>At its core, Giving Circles consist of contributors and attendees. Each attendee recognizes a contributor's efforts and has the option to place bean(s) on the contributor's sheet. Each bean placed represents a fraction of a monetary reward. At the end of the Giving Circle, each contributor is rewarded with a monetary payment, in most cases USDC, based on how many beans they have received relative to the other contributors.</p>
            </div>
        </div>
}

export default About;