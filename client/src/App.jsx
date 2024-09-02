import React from 'react'
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';
import Signup from './pages/Signup';
import Login from './pages/Login';

import { BrowserRouter, Routes, Route } from 'react-router-dom'



const App = () => {
  return (

    <BrowserRouter>

        <Routes>
          <Route path='/' element={<LandingPage />}/>
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/chat/*' element={<ChatPage />} />
        </Routes>

 </BrowserRouter>
  );
};

export default App;