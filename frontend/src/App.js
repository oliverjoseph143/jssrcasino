import React from 'react';
import { Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Player from './pages/Player';
import Forgetpass from './pages/ForgotPassword';
import Otpsend from './pages/OtpLogin';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/App.css';
import PrivacyPolicy from './components/privacypolicy';
import Faq from './components/faq';
import AboutUs from './components/AboutUs';
import DisconnectionPolicy from './components/disconnectionpolicy';
import Vip from './components/Vip';
import Terms from './components/terms';
import Footer from './components/Footer';

function App() {
  return (
    <div>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/player" element={<Player />} />
      <Route path="/forgetpass" element={<Forgetpass />} />
      <Route path="/otpsend" element={<Otpsend />} />
      <Route path="/privacypolicy" element={<PrivacyPolicy />} />
       <Route path="/faq" element={<Faq />} />
       <Route path="/terms" element={<Terms/>} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/disconnectionpolicy" element={<DisconnectionPolicy />} />
        <Route path="/vip" element={<Vip/>} />
    </Routes>
    
  <Footer/>
  </div>
  );
}

export default App;
