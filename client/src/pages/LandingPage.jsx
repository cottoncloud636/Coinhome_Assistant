
//I need:
//-- design: 1) robot icon
//-- functionality: 1) route to login page, route to singup page

import React from "react";
import robot from '../assets/robot.png';
import './page_styles.css';

const LandingPage = ()=>{
    console.log("LandingPage rendered");
    return(
        <div className='outerContainer' >

            <div>
                <img src={robot} alt="Robot" className="robot-image" />
            </div>
            <p className="welcome-text">Welcome to CoinHome Chat Assistant</p>
            <div className='buttons-container'>
                <button className="login-button">Login</button>
                <button className="Signup-button">Sign Up</button>
            </div>

        </div>
    );
};

export default LandingPage;

