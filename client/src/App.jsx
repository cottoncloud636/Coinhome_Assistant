import React, { useEffect, useState } from 'react'
import LeftSection from './components/LeftSection';
import RightSection from './components/RightSection';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [allChats, setAllChats] = useState([]);
  
  useEffect(() => 
    {
          // Example: Fetch initial chat data from an API or backend service
    // fetch('http://localhost:3000/api/chats')
    //   .then(response => response.json())
    //   .then(data => setAllChats(data));

    // Initially, start with no chats
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

  return (
    <Router>
      <div className = 'App'>
        <LeftSection allChats={allChats} createNewChat={createNewChat}/>
        <Routes>
          <Route path='/chat/:chatId' element={<RightSection allChats={allChats} setAllChats={setAllChats} />} />
          <Route path="/" element={<div className='rightbar'>Select a chat to start messaging.</div>} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;