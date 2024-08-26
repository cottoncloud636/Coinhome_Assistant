import React, { useEffect, useState } from 'react'
import LeftSection from '../components/LeftSection';
import RightSection from '../components/RightSection';
import { BrowserRouter, Routes, Route, Router } from 'react-router-dom';

const ChatPage = ()=>{
    const [allChats, setAllChats] = useState([]);
  
    useEffect(() => 
      {
        setAllChats([]);
      },
      []
    );

    const createNewChat = () => {
        const newChat = {
          id: allChats.length ? allChats[allChats.length-1].id+1 : 1, //if there exist one or more elements in allChats array
                            //then take the last chat's id and increment by 1. If allChats.length is 0, means there is
                            //no chats exist in the allChats array, then id start from 1
          chatName: '',
          messages: []
        };
    
        setAllChats([...allChats, newChat]);
      };
    

    /*
     * 1) in-page nested route, used for different chat session on one page
     * 2) path='/': is a relative path to the /chat/* path set up in App.jsx
    */
    return (
        <div className = 'App'>
            <LeftSection allChats={allChats} createNewChat={createNewChat}/>
            <Routes>
                <Route path=':chatId' element={<RightSection allChats={allChats} setAllChats={setAllChats} />} />
                <Route path='/' element={<div className='rightbar'>Select a chat to start messaging.</div>} />
            </Routes>
      </div>
    );
};

export default ChatPage;
