import React, { useState } from 'react';
import userPen from '../assets/user-pen.svg';
import send from '../assets/send.svg';
import coinhomeIcon from '../assets/coinhomeIcon.svg';
import './styles.css';


const RightSection = () => {
    const [message, setMessage] = useState('');
    const [allMessages, setAllMessages] = useState([]); /*store all messages into an array*/
    const sendMessage = async ()=>{ /*async: since send message to GPT and receive answer from GPT takes time */

    }
  
    return (
        <div className='rightbar'>
            <div className='chatArea'>
                <div className='conversation user'>
                    <img src={userPen} className='chatIcon'/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
                <div className='conversation bot'>
                    <img src={coinhomeIcon} className='chatIcon'/>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>

            </div>

            <div className='sendArea'>
                <div className='inputArea'>
                    <input type='text'></input>
                    <button><img src={send} alt='sendIcon' className='sendIcon'/></button>
                </div>
            </div>

            <div><p>footer</p></div>

        </div>
  )
}

export default RightSection;