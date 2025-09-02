import React, { useState } from 'react';
import { Navbar, Nav, Dropdown, Card, Button, Modal, Form } from 'react-bootstrap';
import { FaUser, FaLock, FaEnvelope, FaMobile, FaCalendar, FaGoogle, FaFacebook, FaBars, FaTimes } from 'react-icons/fa';
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Sample game data
  const games = [
    { id: 1, name: 'Blackjack', betAmount: '$10 - $500', image: '/images/blackjack.webp' },
    { id: 2, name: 'Roulette', betAmount: '$5 - $1000', image: '/images/Roulette.webp' },
    { id: 3, name: 'Poker', betAmount: '$20 - $1000', image: '/images/Poker.avif' },
    { id: 4, name: 'Baccarat', betAmount: '$10 - $500', image: '/images/Baccarat.avif' },
    { id: 5, name: 'Slot Machine', betAmount: '$1 - $100', image: '/images/SlotMachines.webp' },
    { id: 6, name: 'Craps', betAmount: '$5 - $500', image: '/images/Caribbean.png' },
    { id: 7, name: 'Bingo', betAmount: '$1 - $50', image: '/images/Craps.jpg' },
    { id: 8, name: 'Keno', betAmount: '$1 - $100', image: '/images/keno.webp' },
    { id: 9, name: 'Pachinko', betAmount: '$5 - $200', image: '/images/pai.jpg' },
    { id: 10, name: 'Video Poker', betAmount: '$1 - $100', image: '/images/video_poker.avif' },
    { id: 11, name: 'Big Six Wheel', betAmount: '$1 - $50', image: '/images/Sic.jpg' },
    { id: 12, name: 'Pool', betAmount: '$5 - $200', image: '/images/Wheel.webp' },
  ];

  return (
    <div className="home-page bg-dark">
      {/* First Navbar */}
      <Navbar bg="success" variant="success" expand="lg" className="navbar-custom justify-content-between ps-4 mb-3">
        <Navbar.Brand href="#home">
          <img src="/images/logo.jpg" alt="Logo" width="30" height="30" className="d-inline-block align-top rounded-circle" />
          {'   '} GOODLUCK CASINO
        </Navbar.Brand>
      
        <div className="d-flex justify-content-end me-4">
          <Button variant="outline-warning my-gradient-background  text-light fw-bolder" className="me-2" onClick={() => setShowLogin(true)}>
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
              <Dropdown.Item href="#vip">VIP</Dropdown.Item>
              <Dropdown.Item href="#about">About Us</Dropdown.Item>
              <Dropdown.Item href="#terms">Terms & Conditions</Dropdown.Item>
              <Dropdown.Item as={Link} to="/pr">Privacy Policy</Dropdown.Item>
              <Dropdown.Item href="#faq">FAQ</Dropdown.Item>
              <Dropdown.Item href="#disconnect">Disconnection Policy</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        
        <Navbar.Toggle 
          aria-controls="basic-navbar-nav" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </Navbar.Toggle>
      </Navbar>

      {/* Second Navbar */}
      <Navbar bg="success" variant="success" expand="lg" className="navbar-custom py-2 justify-content-center">
        <Navbar.Collapse id="basic-navbar-nav" className={mobileMenuOpen ? 'show' : ''}>
          <Nav className="me-4 justify-content-center">
            <Nav.Link href="#exchange" className='ms-5 me-4 sam'>
              <GiMoneyStack className="me-1" /> Exchange
            </Nav.Link>
            <Nav.Link href="#sportsbook" className='ms-5 me-4 sam'>
              <GiDiceSixFacesFive className="me-1" /> Sportsbook
            </Nav.Link>
            <Nav.Link href="#live-casino" className='ms-5 me-4'>
              <GiPokerHand className="me-1" /> Live Casino
            </Nav.Link>
            <Nav.Link href="#slots" className='ms-5 me-4'>
              <GiTvTower className="me-1" /> Slots
            </Nav.Link>
            <Nav.Link href="#tournaments" className='ms-5 me-4'>
              <GiTrophy className="me-1" /> Tournaments
            </Nav.Link>
            <Nav.Link href="#promotions" className='ms-5 me-4'>
              <GiCardboardBoxClosed className="me-1" /> Promotions
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {/* Hero Image */}
      <div className="hero-image mt-1 ">
        <img src="/images/casino-bg.jpg" alt="Casino" className="img-fluid w-100" style={{ height: '80%', objectFit: 'contain,cover' }} />
      </div>
 <hr
        style={{
            color: '#FFEB9C',
            backgroundColor:'#FFEB9C',
            height: 5
        }}
    />
      {/* Games Section */}
      <div className="container my-5 ">
        <h2 className="section-title">Popular Casino Games</h2>
        <div className="row">
          {games.map(game => (
            <div key={game.id} className="col-md-3 col-sm-6 mb-4">
              <Card className="game-card card-bg-color">
                <Card.Img variant="top" src={game.image} />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>Bet Amount: {game.betAmount}</Card.Text>
                  <Button className="join-btn" href={`/game/${game.id}`}>
                    Join Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />

      {/* Login Modal */}
      <LoginModal show={showLogin} onHide={() => setShowLogin(false)} onSwitchToRegister={() => {setShowLogin(false); setShowRegister(true);}} />

      {/* Register Modal */}
      <RegisterModal show={showRegister} onHide={() => setShowRegister(false)} onSwitchToLogin={() => {setShowRegister(false); setShowLogin(true);}} />
    </div>
  );
};

export default Home;