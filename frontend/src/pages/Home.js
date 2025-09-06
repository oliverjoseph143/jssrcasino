import React, { useState, useRef, useEffect } from 'react';
import { Navbar, Nav, Dropdown, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaMobile, FaCalendar, FaGoogle, FaFacebook, FaBars, FaTimes, FaWhatsapp, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { GiCardboardBoxClosed, GiDiceSixFacesFive, GiPokerHand, GiTvTower, GiTrophy, GiMoneyStack } from 'react-icons/gi';
import { CgProfile } from 'react-icons/cg';
import { IoMdLogIn, IoMdLogOut } from 'react-icons/io';
import Footer from '../components/Footer';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import { Link } from 'react-router-dom';
import '../styles/App.css';

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Sample game data
  const games = [
    { id: 1, name: 'Blackjack', betAmount: 'Rs.10 - Rs.500', image: '/images/blackjack.png' },
    { id: 2, name: 'Roulette', betAmount: 'Rs.5 - Rs.1000', image: '/images/Roulette.png' },
    { id: 3, name: 'Poker', betAmount: 'Rs.20 - Rs.1000', image: '/images/Poker.png' },
    { id: 4, name: 'Baccarat', betAmount: 'Rs.10 - Rs.500', image: '/images/Baccarat.png' },
    { id: 5, name: 'Slot Machine', betAmount: 'Rs.1 - Rs.100', image: '/images/SlotMachines.png' },
    { id: 6, name: 'Craps', betAmount: 'Rs.5 - Rs.500', image: '/images/Caribbean.png' },
    { id: 7, name: 'Bingo', betAmount: 'Rs.1 - Rs.50', image: '/images/Craps.jpg' },
    { id: 8, name: 'Keno', betAmount: 'Rs.1 - Rs.100', image: '/images/keno.png' },
    { id: 9, name: 'Pachinko', betAmount: 'Rs.5 - Rs.200', image: '/images/pai.jpg' },
    { id: 10, name: 'Video Poker', betAmount: 'Rs.1 - Rs.100', image: '/images/videopoker.png' },
    { id: 11, name: 'Big Six Wheel', betAmount: 'Rs.1 - Rs.50', image: '/images/Sic.jpg' },
    { id: 12, name: 'Pool', betAmount: 'Rs.5 - Rs.200', image: '/images/Wheel.png' },
  ];
  
  // Sports data
  const sports = [
    { id: 1, name: 'Cricket', image: '/images/cricket.jpg' },
    { id: 2, name: 'Soccer', image: '/images/soccer.jpg' },
    { id: 3, name: 'Tennis', image: '/images/tennis.jpg' },
  ];
  
  // Hero images
  const heroImages = [
    '/images/hero1.jpg',
    '/images/hero2.jpg',
    '/images/hero3.jpg',
    '/images/hero4.jpg',
    '/images/hero5.jpg',
    '/images/hero6.jpg'
  ];
  
  // Secondary navigation items with local icons
  const secondaryNavItems = [
    { id: 1, name: 'Exchange', icon: '/images/exchange-icon.png', href: '#exchange' },
    { id: 2, name: 'Sportsbook', icon: '/images/sportsbook-icon.png', href: '#sportsbook' },
    { id: 3, name: 'Live Casino', icon: '/images/casino-icon.png', href: '#live-casino' },
    { id: 4, name: 'Slots', icon: '/images/slot.png', href: '#slots' },
    { id: 5, name: 'Tournaments', icon: '/images/tournaments-icon.png', href: '#tournaments' },
    { id: 6, name: 'Promotions', icon: '/images/promotions-icon.png', href: '#promotions' },
  ];
  
  // Handler for secondary nav links
  const handleNavClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };
  
  // Handler for Join Now buttons
  const handleJoinClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };
  
  // Handler for sports card click
  const handleSportClick = (e) => {
    e.preventDefault();
    setShowLogin(true);
  };
  
  // Auto-scroll for hero slider - changed to 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000); // Changed from 5000 to 10000 (10 seconds)
    return () => clearInterval(interval);
  }, [heroImages.length]);
  
  // Manual slider navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
  };
  
  return (
    <div className="home-page bg-dark">
      {/* First Navbar */}
      <Navbar bg="success" variant="success" expand="lg" className="navbar-custom justify-content-between ps-4 mb-3">
        {/* Logo and Title - Always Visible */}
        <Navbar.Brand href="#" className="d-flex align-items-center">
          <img src="/images/logo.png" alt="Logo" width="60" height="60" className="d-inline-block align-top  " />
          {'   '}  GOODLUCK CASINO
        </Navbar.Brand>
      
        {/* Desktop Navigation */}
        <div className="d-flex justify-content-end me-4 d-none d-lg-flex">
          <Button variant="outline-warning my-gradient-background text-light fw-bolder" className="me-2" onClick={() => setShowLogin(true)}>
            <IoMdLogIn className="me-1" /> Login
          </Button>
          <Button variant="outline-warning my-gradient-background text-light fw-bolder" onClick={() => setShowRegister(true)}>
            <CgProfile className="me-1" /> Register
          </Button>
          <Dropdown className="ms-2 dropstart">
            <Dropdown.Toggle variant="success" id="navbar-dropdown">
              <FaBars />
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropleft'>
              <Dropdown.Item as={Link} to="/vip">VIP</Dropdown.Item>
              <Dropdown.Item  as={Link} to="/aboutus">About Us</Dropdown.Item>
              <Dropdown.Item as={Link} to="/terms">Terms & Conditions</Dropdown.Item>
              <Dropdown.Item as={Link} to="/privacypolicy">Privacy Policy</Dropdown.Item>
              <Dropdown.Item  as={Link} to="/faq">FAQ</Dropdown.Item>
              <Dropdown.Item  as={Link} to="/disconnectionpolicy">Disconnection Policy</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        {/* Mobile Navigation - Removed toggle button */}
        <div className="d-flex d-lg-none align-items-center">
          <Button variant="outline-warning my-gradient-background text-light fw-bolder me-2 btn-sm" onClick={() => setShowLogin(true)}>
            <IoMdLogIn className="me-1" /> Login
          </Button>
          <Button variant="outline-warning my-gradient-background text-light fw-bolder btn-sm" onClick={() => setShowRegister(true)}>
            <CgProfile className="me-1" /> Register
          </Button>
        </div>
      </Navbar>
      
      {/* Second Navbar - Hidden on mobile */}
      <Navbar bg="success" variant="success" expand="lg" className="navbar-custom py-2 justify-content-center d-none d-lg-flex">
        <div className="container">
          <Nav className="justify-content-center">
            {secondaryNavItems.map(item => (
              <Nav.Link 
                key={item.id} 
                href={item.href} 
                className='ms-5 me-4 text-warning fw-bolder secondary-nav-link' 
                onClick={handleNavClick}
              >
                <img src={item.icon} alt={item.name} className="secondary-nav-icon" />
                {item.name}
              </Nav.Link>
            ))}
          </Nav>
        </div>
      </Navbar>
      
      {/* Mobile Bottom Navigation */}
      <div className="mobile-bottom-nav bg-dark d-lg-none">
        <Nav className="justify-content-around w-100">
          {secondaryNavItems.map(item => (
            <Nav.Link 
              key={item.id} 
              href={item.href} 
              onClick={handleNavClick} 
              className="mobile-nav-item"
            >
              <div className="mobile-nav-icon">
                <img src={item.icon} alt={item.name} className="mobile-nav-img" />
              </div>
              <div className="mobile-nav-text text-warning fw-bold">{item.name}</div>
            </Nav.Link>
          ))}
        </Nav>
      </div>
      
      {/* Hero Image Slider */}
      <div className="hero-slider-container position-relative">
        <div className="hero-slider">
          {heroImages.map((image, index) => (
            <div 
              key={index} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${image})` }}
            >
              
            </div>
          ))}
        </div>
        <button className="slider-btn prev-btn" onClick={prevSlide}>
          <FaChevronLeft />
        </button>
        <button className="slider-btn next-btn" onClick={nextSlide}>
          <FaChevronRight />
        </button>
        <div className="slider-dots">
          {heroImages.map((_, index) => (
            <span 
              key={index} 
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            ></span>
          ))}
        </div>
      </div>
      
      <hr
        style={{
            color: '#FFEB9C',
            backgroundColor:'#FFEB9C',
            height: 5
        }}
      />
      
      {/* Sports Section */}
      <div className="container my-5">
        <h2 className="section-title">Popular Sports</h2>
        <div className="sports-container">
          {sports.map(sport => (
            <div key={sport.id} className="sport-card" onClick={handleSportClick}>
              <div className="sport-bg" style={{ backgroundImage: `url(${sport.image})` }}>
                <div className="sport-title">
                  <span className="gold-text">{sport.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Games Section */}
      <div className="container my-5">
        <h2 className="section-title">Popular Casino Games</h2>
        <div className="games-grid">
          {games.map(game => (
            <div key={game.id} className="game-card">
              <div className="game-image-container">
                <div className="game-image" style={{ backgroundImage: `url(${game.image})` }}>
                  <div className="game-overlay">
                    <h3>{game.name}</h3>
                    <p>Bet: {game.betAmount}</p>
                    <Button className="join-btn" onClick={handleJoinClick}>
                      Join Now
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Footer */}
      {/* <Footer /> */}
      {/* sApp Float Button */}
      <a 
        href="https://wa.me/+919042541543" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="whatsapp-float"
      >
        <FaWhatsapp />
      </a>
      
      {/* Login Modal */}
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} onSwitchToRegister={() => {setShowLogin(false); setShowRegister(true);}} />
      
      {/* Register Modal */}
      <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} onSwitchToLogin={() => {setShowRegister(false); setShowLogin(true);}} />
   
      <style jsx>{`
        /* Hero Slider Styles */
        .hero-slider-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          margin-top: 1rem;
          height: 70vh;
        }
        
        .hero-slider {
          position: relative;
          width: 100%;
          height: 100%;
        }
        
        .hero-slide {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          opacity: 0;
          transition: opacity 0.8s ease-in-out;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .hero-slide.active {
          opacity: 1;
        }
        
        .slide-content {
          text-align: center;
          color: white;
          background: rgba(0, 0, 0, 0.6);
          padding: 30px;
          border-radius: 10px;
          max-width: 600px;
        }
        
        .slide-content h2 {
          font-size: 2.5rem;
          margin-bottom: 15px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
        }
        
        .slide-content p {
          font-size: 1.2rem;
          margin-bottom: 20px;
        }
        
        .slider-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background-color: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 10;
          transition: background-color 0.3s;
        }
        
        .slider-btn:hover {
          background-color: rgba(0, 0, 0, 0.8);
        }
        
        .prev-btn {
          left: 10px;
        }
        
        .next-btn {
          right: 10px;
        }
        
        .slider-dots {
          position: absolute;
          bottom: 20px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 10px;
          z-index: 10;
        }
        
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: rgba(255, 255, 255, 0.5);
          cursor: pointer;
          transition: background-color 0.3s;
        }
        
        .dot.active {
          background-color: white;
        }
        
        /* Secondary Navbar Styles */
        .secondary-nav-link {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffc107 !important;
          font-weight: bold;
          transition: color 0.3s;
        }
        
        .secondary-nav-link:hover {
          color: white !important;
        }
        
        .secondary-nav-icon {
          width: 24px;
          height: 24px;
          margin-bottom: 4px;
        }
        
        /* Sports Section Styles */
        .sports-container {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          margin-top: 20px;
          flex-wrap: nowrap;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: thin;
          scrollbar-color: #FFD700 #333;
        }
        
        .sports-container::-webkit-scrollbar {
          height: 6px;
        }
        
        .sports-container::-webkit-scrollbar-track {
          background: #333;
        }
        
        .sports-container::-webkit-scrollbar-thumb {
          background-color: #FFD700;
          border-radius: 3px;
        }
        
        .sport-card {
          flex: 0 0 auto;
          min-width: 250px;
          border-radius: 15px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s;
          height: 200px;
        }
        
        .sport-card:hover {
          transform: translateY(-5px);
        }
        
        .sport-bg {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .sport-title {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.8), transparent);
          padding: 20px;
          text-align: center;
        }
        
        .gold-text {
          color: #FFD700;
          font-weight: bold;
          font-size: 24px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
          position: relative;
        }
        
        .gold-text::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(to right, transparent, #FF0000, transparent);
        }
        
        /* Games Section Styles */
        .games-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }
        
        .game-card {
          border-radius: 10px;
          overflow: hidden;
          background-color: #222;
          transition: transform 0.3s;
          height: 300px;
        }
        
        .game-card:hover {
          transform: translateY(-5px);
        }
        
        .game-image-container {
          position: relative;
          height: 100%;
          width: 100%;
        }
        
        .game-image {
          width: 100%;
          height: 100%;
          background-size: cover;
          background-position: center;
          position: relative;
        }
        
        .game-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
          padding: 20px;
          color: white;
          transform: translateY(100%);
          transition: transform 0.3s;
        }
        
        .game-card:hover .game-overlay {
          transform: translateY(0);
        }
        
        .game-overlay h3 {
          margin: 0 0 10px 0;
          font-size: 1.2rem;
        }
        
        .game-overlay p {
          margin: 0 0 15px 0;
          font-size: 0.9rem;
        }
        
        .join-btn {
          background: linear-gradient(to right, #FFD700, #FFA500);
          border: none;
          color: #000;
          font-weight: bold;
          padding: 5px 15px;
          border-radius: 20px;
          transition: all 0.3s;
        }
        
        .join-btn:hover {
          background: linear-gradient(to right, #FFA500, #FFD700);
          transform: scale(1.05);
        }
        
        /* WhatsApp Float Button */
        .whatsapp-float {
          position: fixed;
          width: 60px;
          height: 60px;
          bottom: 20px;
          right: 20px;
          background-color: #25d366;
          color: #FFF;
          border-radius: 50px;
          text-align: center;
          font-size: 30px;
          box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: bounce 2s infinite;
          transition: background-color 0.3s;
        }
        
        .whatsapp-float:hover {
          background-color: #128C7E;
        }
        
        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-20px);
          }
          60% {
            transform: translateY(-10px);
          }
        }
        
        /* Mobile Bottom Navigation */
        .mobile-bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: black;
          padding: 8px 0;
          z-index: 1000;
          display: flex;
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .mobile-nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          text-decoration: none;
          padding: 5px;
          transition: background-color 0.3s;
          border-radius: 5px;
          min-width: 60px;
        }
        
        .mobile-nav-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }
        
        .mobile-nav-icon {
          font-size: 1.2rem;
          margin-bottom: 2px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .mobile-nav-img {
          width: 30px;
          height: 30px;
        }
        
        .mobile-nav-text {
          font-size: 0.7rem;
          text-align: center;
          line-height: 1;
        }
        
        /* Mobile View Adjustments */
        @media (max-width: 992px) {
          .hero-slider-container {
            height: 50vh;
          }
          
          .slide-content h2 {
            font-size: 2rem;
          }
          
          .slide-content p {
            font-size: 1rem;
          }
          
          .sport-card {
            height: 150px;
            min-width: 200px;
          }
          
          .gold-text {
            font-size: 20px;
          }
          
          .whatsapp-float {
            bottom: 80px;
          }
          
          .games-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 15px;
          }
          
          .game-card {
            height: 250px;
          }
        }
        
        @media (max-width: 768px) {
          /* Sports container changes for mobile */
          .sports-container {
            display: grid;
            grid-template-columns: repeat(3, 30%);
            justify-content: space-between;
            gap: 10px;
            overflow-x: hidden;
          }
          
          .sport-card {
            height: 120px;
            min-width: auto;
            width: 100%;
          }
          
          .gold-text {
            font-size: 16px;
          }
          
          .navbar-custom {
            padding: 5px 10px;
          }
          
          .navbar-brand {
            font-size: 1rem;
          }
          
          .navbar-brand img {
            width: 25px;
            height: 25px;
          }
          
          .games-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
          }
          
          .game-card {
            height: 200px;
          }
          
          /* Adjust mobile nav text size for medium screens */
          .mobile-nav-text {
            font-size: 0.65rem;
          }
        }
        
        @media (max-width: 576px) {
          .hero-slider-container {
            height: 40vh;
          }
          
          .slide-content {
            padding: 20px;
          }
          
          .slide-content h2 {
            font-size: 1.5rem;
          }
          
          .slide-content p {
            font-size: 0.9rem;
          }
          
          .sport-card {
            height: 100px;
          }
          
          .gold-text {
            font-size: 14px;
          }
          
          .games-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
          }
          
          .game-card {
            height: 150px;
          }
          
          .game-overlay h3 {
            font-size: 1rem;
          }
          
          .game-overlay p {
            font-size: 0.8rem;
          }
          
          .join-btn {
            font-size: 0.8rem;
            padding: 3px 10px;
          }
          
          /* Adjust mobile nav for small screens */
          .mobile-bottom-nav {
            padding: 5px 0;
          }
          
          .mobile-nav-icon {
            font-size: 1rem;
            margin-bottom: 1px;
          }
          
          .mobile-nav-text {
            font-size: 0.6rem;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;