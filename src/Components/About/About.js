import React, { useState } from 'react';
import "./About.css";

const About = (props)=> {
    return <div className="about">
            <div>
                <h1>Welcome</h1>
                <p>Giving Circles are a way to record DAO members' contributions and have them rewarded based on their efforts. All done entirely on-chain.</p>
            </div>
            <div>
                <h3>Giving Circle Factory</h3>
                <p>The factory creates and manages all instances of the Giving Circles.</p>
                <p>Only certain wallets are able to use the factory to create new Giving Circles.</p>
            </div>
            <div>
                <h3>Giving Circles</h3>
                <p>A Giving Circle may have many configurable options during creation. </p>
                <p>
                    Giving Circles consist of three phases: Proposal Creation, Bean Placement, and Gift Redemption. 
                </p>
                <p>When a Giving Circle is created, there are special roles designated to certain wallets. These roles may be a Circle Leader or Funds Manager.</p>
                <p>A Circle Leader has the ability to progress the Giving Circle through it's phases. </p>
                <p>A Funds Manager is able to reward the contributors for their efforts and withdraw remaining funds back to the treasury or roll them over to another Giving Circle.</p>
                <h3>Proposal Creation</h3>
                <p>
                    Contributors and Attendees are added during this phase.
                    Contributors are those who have made some form of contribution(s) to the DAO. They make a proposal in hopes that Attendees will reward them beans, ultimately rewarding them in USDC.
                    Attendees are people who are attending a Giviing Circle. They place beans upon contributors.
                </p>
                <h3>Bean Placement Phase</h3>
                <p>

                </p>
            </div>
            <div>
                <h3>Video Games</h3>
                <p>
                    There are two video games which accompany this project. Each one loads in the assets in exactly the same way. However, the utilize them in different ways. They load in the same asset, but the gameplay is completely different for the asset based on which game you are playing!
                </p>
            </div>
        </div>
}

export default About;