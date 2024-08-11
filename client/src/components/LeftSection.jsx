import React from 'react'
import {Link} from 'react-router-dom';
import coinhomeIcon from '../assets/coinhomeIcon.svg';
import addIcon from '../assets/addIcon.svg';
import message from '../assets/message.svg';
import deleteIcon from '../assets/delete.svg';
import setting from '../assets/setting.svg';
import logout from '../assets/logout.svg';
import './styles.css';

const LeftSection = ({allChats=[], createNewChat}) => {
//   const allChats = [
//     {id: 1, chatName: 'hi how are you, hello world, I want to make this message a bit long, because I want to test'},
//     {id: 2, chatName: 'What is coinhome?'},
//     {id: 3, chatName: 'Things are going well'},
//     {id: 4, chatName: 'Very hot these days.'}
//   ]

  return (
    <div className='leftbar'>
            <div className='leftUpperBar'>
                <div className='leftUpperTop'>
                    <img src={coinhomeIcon} alt='companyIcon' className='icon'/>
                    <span className='company'>Coinhome Chat Assistant</span>
                </div>
                <button className='newChat' onClick={createNewChat}>
                    <img src={addIcon} alt='' className='addChatBtn'/>New Chat
                </button>
                <div className='queryside'>
                    {allChats.map(chat=>(
                        <div key={chat.id}> 
                            <Link to={`/chat/${chat.id}`}>
                                <button className='msg'>
                                    <img src={message} alt='messageIcon'/>{chat.chatName || 'New Chat'}
                                </button>
                            </Link>
                        </div>
                        
                    ))}
                    {/* <button className='msg'><img src={message} alt='messageIcon'/>hey</button> */}
                    {/* <button className='msg'><img src={message} alt='messageIcon'/>What is coinhome</button> */}
                </div>
            </div>  
{/* 
            <div className='leftBottomBar'>
                <div className='listItem'><img src={deleteIcon} alt='itemIcon' className='listItemImg'/>Clear conversations</div>
                <div className='listItem'><img src={setting} alt='itemIcon' className='listItemImg'/>Settings</div>
                <div className='listItem'><img src={logout} alt='itemIcon' className='listItemImg'/>Logout</div>
            </div> */}

        </div>
  )
}

export default LeftSection;