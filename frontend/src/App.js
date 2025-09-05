import React from 'react';
//import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Player from './pages/Player';
import Pri from './components/privacypolicy';
import Forgetpass from './pages/ForgotPassword';
import Otpsend from './pages/OtpLogin';
import 'bootstrap/dist/css/bootstrap.min.css';





import './styles/App.css';

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player />} />
        <Route path="/forgetpass" element={<Forgetpass />} />
        <Route path="/otpsend" element={<Otpsend />} />
        <Route path="/pr" element={<pri />} />
       
        
       
        
      
      </Routes>
    
  );
}

export default App;

