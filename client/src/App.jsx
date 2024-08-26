import React from 'react'
import LandingPage from './pages/LandingPage';
import ChatPage from './pages/ChatPage';

import { BrowserRouter, Routes, Route } from 'react-router-dom'



const App = () => {
  return (

    <BrowserRouter>

        <Routes>
          <Route path='/' element={<LandingPage />} hello/>
          <Route path='/chat/*' element={<ChatPage />} />
        </Routes>

 </BrowserRouter>
  );
};

export default App;