
//I need:
//-- design: 1) robot icon
//-- functionality: 1) route to login page, route to singup page

import React from "react";
import {Link} from 'react-router-dom';
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
                <Link to='/login'><button className="landing-button">Login</button></Link>
                <Link to='/signup'><button className="landing-button">Sign Up</button></Link>
            </div>

        </div>
    );
};

export default LandingPage;

