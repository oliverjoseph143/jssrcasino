import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown, Card, Button, Modal, Form, Alert, Table } from 'react-bootstrap';
import { FaUser, FaWallet, FaMoneyBillWave, FaMoneyCheckAlt, FaCog, FaHistory, FaTicketAlt, FaTrophy, FaShareAlt, FaSignOutAlt, FaHome, FaTable, FaGamepad, FaHashtag, FaDice, FaUsers, FaWhatsapp } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
import Footer from '../components/Footer';
import DepositModal from '../components/DepositModal';
import WithdrawModal from '../components/WithdrawModal';
import AccountModal from '../components/AccountModal';
import TransactionModal from '../components/TransactionModal';
import TicketModal from '../components/TicketModal';
import WinnersModal from '../components/WinnersModal';
import ReferralModal from '../components/ReferralModal';
import axios from 'axios';
import '../styles/App.css';
import '../styles/TournamentCard.css'
const Player = () => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [showTransaction, setShowTransaction] = useState(false);
  const [showTicket, setShowTicket] = useState(false);
  const [showWinners, setShowWinners] = useState(false);
  const [showReferral, setShowReferral] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [walletAmount, setWalletAmount] = useState(0);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [showTicketStatus, setShowTicketStatus] = useState(false);
  const [showTicketModify, setShowTicketModify] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [ticketResponses, setTicketResponses] = useState([]);
  const [referralCode, setReferralCode] = useState('');
  
  // Fetch wallet balance
  const fetchWalletBalance = async () => {
 try {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/wallet/balance`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      params: { userId } 
    }
  );
  setWalletAmount(response.data.balance);
      // Update user in localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        userData.wallet_balance = response.data.balance;
        localStorage.setItem('user', JSON.stringify(userData));
      }
    } catch (error) {
      console.error('Error fetching wallet balance:', error);
    }
  };
  
  // Fetch user tickets
  const fetchUserTickets = async () => {
    try {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/tickets/user`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  );
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };
  
  // Fetch ticket responses
  const fetchTicketResponses = async (ticketId) => {
   try {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/tickets/responses/${ticketId}`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  )
      setTicketResponses(response.data);
    } catch (error) {
      console.error('Error fetching ticket responses:', error);
    }
  };
  
  // Fetch referral code
  const fetchReferralCode = async () => {
   try {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/user/referral`,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  );
      setReferralCode(response.data.referral_code);
    } catch (error) {
      console.error('Error fetching referral code:', error);
    }
  };
  
  // Update ticket
  const updateTicket = async (ticketId, updatedData) => {
  try {
  await axios.put(
    `${process.env.REACT_APP_API_URL}/tickets/${ticketId}`,
    updatedData,
    {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }
  );
      fetchUserTickets(); // Refresh tickets after update
      setShowTicketModify(false);
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };
  
  // Initialize data
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      setUserId(userData.id);
      setWalletAmount(userData.wallet_balance);
      fetchWalletBalance();
      fetchReferralCode();
    } else {
      window.location.href = '/';
    }
  }, []);
  
  // Fetch tickets when modal is opened
  useEffect(() => {
    if (showModalStatus) {
      fetchUserTickets();
    }
  }, [showModalStatus]);
  
  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };
  
  // Handle wallet update after deposit/withdraw
  const handleWalletUpdate = () => {
    fetchWalletBalance();
  };
  
  // Handle ticket modification
  const handleModifyTicket = (ticket) => {
    setSelectedTicket(ticket);
    fetchTicketResponses(ticket.id);
    setShowTicketModify(true);
  };
  
  // Handle WhatsApp click
  const handleWhatsAppClick = () => {
    const phoneNumber = "1234567890"; // Replace with actual WhatsApp number
    const message = "Hello, I'm interested in your casino services.";
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };
  
  // Render active section
  const renderActiveSection = () => {
    switch (activeSection) {
      case 'home':
        return <HomeSection />;
      case 'table-games':
        return <TableGamesSection />;
      case 'gaming-machines':
        return <GamingMachinesSection />;
      case 'numbers-games':
        return <NumbersGamesSection />;
      case 'live-casino':
        return <LiveCasinoSection />;
      case 'tournaments':
        return <TournamentsSection />;
      default:
        return <HomeSection />;
    }
  };
  
  return (
    <div className="player-page bg-dark">
      {/* Player Navbar - Mobile Optimized */}
      <Navbar bg="success" variant="success" expand="lg" className="player-navbar justify-content-between ps-4 mb-3">
        <Navbar.Brand href="#home" className='text-warning fw-bolder'>
          <img src="./images/logo.jpg" alt="Logo" width="30" height="30" className="d-inline-block align-top rounded-circle" />
          {' '} GOODLUCK
        </Navbar.Brand>
        
        {/* Mobile-friendly right section */}
        <div className="d-flex align-items-center">
          {/* Welcome message - hidden on mobile */}
          <span className="d-none d-md-inline me-3 mt-1 text-light fw-bold">Welcome, {user?.name}</span>
          
          {/* Balance - visible on all screens */}
          <div className="d-flex align-items-center p-2 bg-warning text-danger rounded-pill me-2">
            <FaWallet className="me-1 ms-1" />
            <span className="d-none d-sm-inline">${walletAmount}</span>
            <span className="d-sm-none">${walletAmount.toString().substring(0, 6)}...</span>
          </div>
          
          {/* User menu - visible on all screens */}
          <div className="position-relative">
            <Button 
              variant="outline-light" 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="p-1"
            >
              {user?.profileImage ? (
                <img 
                  src={user.profileImage} 
                  alt="Profile" 
                  className="rounded-circle" 
                  width="30" 
                  height="30" 
                />
              ) : (
                <CgProfile size={24} />
              )}
            </Button>
            
            {showUserMenu && (
              <>
                {/* Backdrop to close menu when clicking outside */}
                <div 
                  className="backdrop position-fixed inset-0 z-index-10 bg-black bg-opacity-25" 
                  onClick={() => setShowUserMenu(false)}
                ></div>
                
                {/* User Menu Modal - Positioned in top-right corner */}
                <div className="user-menu bg-dark position-absolute top-16 end-0 mt-2 me-2 w-64 shadow-lg rounded">
                  <div className="d-flex justify-content-between align-items-center p-2 border-bottom text-light">
                    <span className="font-weight-bold">User Menu</span>
                    {/* Close Button */}
                    <button 
                      className="btn-close btn-close-white" 
                      onClick={() => setShowUserMenu(false)}
                      aria-label="Close"
                    ></button>
                  </div>
                  
                  <div className="p-2 border-bottom text-light">
                    {user?.profileImage ? (
                      <img 
                        src={user.profileImage} 
                        alt="Profile" 
                        className="rounded-circle me-2" 
                        width="40" 
                        height="40" 
                      />
                    ) : (
                      <CgProfile size={40} className="me-2" />
                    )}
                    <div>
                      <div>{user?.name}</div>
                      
                      <div className={user?.emailVerified ? 'verified' : 'not-verified'}>
                        Email: {user?.emailVerified ? 'Verified' : 'Not Verified'}
                      </div>
                      <div className={user?.mobileVerified ? 'verified' : 'not-verified'}>
                        Mobile: {user?.mobileVerified ? 'Verified' : 'Not Verified'}
                      </div>
                    </div>
                  </div>
                  
                  <div className="d-grid gap-2 p-2">
                    <Button 
                      variant="success" 
                      size="sm"
                      onClick={() => { setShowUserMenu(false); setShowDeposit(true); }}
                    >
                      <FaMoneyBillWave className="me-1" /> Deposit
                    </Button>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => { setShowUserMenu(false); setShowWithdraw(true); }}
                    >
                      <FaMoneyCheckAlt className="me-1" /> Withdraw
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={() => { setShowUserMenu(false); setShowAccount(true); }}
                    >
                      <FaCog className="me-1" /> Profile
                    </Button>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-light" size="sm" className="w-100">
                        <FaHistory className="me-1" /> Transactions
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='bg-dark'>
                        <Dropdown.Item onClick={() => { setShowUserMenu(false); setShowTransaction('money'); }}>
                          Money Transactions
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { setShowUserMenu(false); setShowTransaction('bet'); }}>
                          Bet Transactions
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown>
                      <Dropdown.Toggle variant="outline-light" size="sm" className="w-100">
                        <FaTicketAlt className="me-1" /> Ticket
                      </Dropdown.Toggle>
                      <Dropdown.Menu className='bg-dark'>
                        <Dropdown.Item onClick={() => { setShowUserMenu(false); setShowTicket(true); }}>
                          Raise Ticket
                        </Dropdown.Item>
                        <Dropdown.Item onClick={() => { setShowUserMenu(false); setShowTicketStatus(true); }}>
                          Ticket Status
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={() => { setShowUserMenu(false); setShowWinners(true); }}
                    >
                      <FaTrophy className="me-1" /> Winners
                    </Button>
                    <Button 
                      variant="outline-light" 
                      size="sm"
                      onClick={() => { setShowUserMenu(false); setShowReferral(true); }}
                    >
                      <FaShareAlt className="me-1" /> Refer
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={handleLogout}
                    >
                      <FaSignOutAlt className="me-1" /> Logout
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </Navbar>
      
      {/* Second Navbar - Desktop Version */}
      <Navbar bg="success" variant="success" className="player-navbar py-2 d-none d-lg-block">
        <div className="container-fluid px-0">
          <Nav className="d-flex justify-content-center w-100 mx-auto fs-6">
            <Nav.Link 
              onClick={() => setActiveSection('home')}
              className={`px-3 ${activeSection === 'home' ? 'text-warning' : ''}`}
            >
              <FaHome className="me-1" /> Home
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('table-games')}
              className={`px-3 ${activeSection === 'table-games' ? 'text-warning' : ''}`}
            >
              <FaTable className="me-1" /> Table Games
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('gaming-machines')}
              className={`px-3 ${activeSection === 'gaming-machines' ? 'text-warning' : ''}`}
            >
              <FaGamepad className="me-1" /> Gaming Machines
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('numbers-games')}
              className={`px-3 ${activeSection === 'numbers-games' ? 'text-warning' : ''}`}
            >
              <FaHashtag className="me-1" /> Numbers Games
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('live-casino')}
              className={`px-3 ${activeSection === 'live-casino' ? 'text-warning' : ''}`}
            >
              <FaDice className="me-1" /> Live Casino
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('tournaments')}
              className={`px-3 ${activeSection === 'tournaments' ? 'text-warning' : ''}`}
            >
              <FaUsers className="me-1" /> Tournaments
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      
      {/* WhatsApp Icon - Mobile Only (Above Bottom Navbar) */}
      <div className="whatsapp-icon-mobile d-lg-none" onClick={handleWhatsAppClick}>
        <FaWhatsapp size={32} color="white" />
      </div>
      
      {/* Mobile Bottom Navigation - Fixed at bottom */}
      <Navbar bg="success" variant="success" className="player-navbar py-2 fixed-bottom d-lg-none">
        <div className="container-fluid px-0">
          <Nav className="d-flex justify-content-around w-100 mx-auto">
            <Nav.Link 
              onClick={() => setActiveSection('home')}
              className={`text-center ${activeSection === 'home' ? 'text-warning' : 'text-light'}`}
            >
              <FaHome className="d-block mx-auto" />
              <span className="d-block small">Home</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('table-games')}
              className={`text-center ${activeSection === 'table-games' ? 'text-warning' : 'text-light'}`}
            >
              <FaTable className="d-block mx-auto" />
              <span className="d-block small">Tables</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('gaming-machines')}
              className={`text-center ${activeSection === 'gaming-machines' ? 'text-warning' : 'text-light'}`}
            >
              <FaGamepad className="d-block mx-auto" />
              <span className="d-block small">Machines</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('numbers-games')}
              className={`text-center ${activeSection === 'numbers-games' ? 'text-warning' : 'text-light'}`}
            >
              <FaHashtag className="d-block mx-auto" />
              <span className="d-block small">Numbers</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('live-casino')}
              className={`text-center ${activeSection === 'live-casino' ? 'text-warning' : 'text-light'}`}
            >
              <FaDice className="d-block mx-auto" />
              <span className="d-block small">Live</span>
            </Nav.Link>
            <Nav.Link 
              onClick={() => setActiveSection('tournaments')}
              className={`text-center ${activeSection === 'tournaments' ? 'text-warning' : 'text-light'}`}
            >
              <FaUsers className="d-block mx-auto" />
              <span className="d-block small">Tournaments</span>
            </Nav.Link>
          </Nav>
        </div>
      </Navbar>
      
      {/* WhatsApp Icon - Desktop Only */}
      <div className="whatsapp-icon-desktop d-none d-lg-block" onClick={handleWhatsAppClick}>
        <FaWhatsapp size={40} color="#25D366" />
      </div>
      
      {/* Main Content - Added padding for mobile fixed navbar */}
      <div className="container my-4 pb-5">
        {renderActiveSection()}
      </div>
       
      {/* Footer - Hidden on mobile */}
      <div className="d-none d-lg-block">
        <Footer />
      </div>
      
      {/* Modals */}
      <DepositModal 
        show={showDeposit} 
        onHide={() => setShowDeposit(false)} 
        onWalletUpdate={handleWalletUpdate} 
      />
      <WithdrawModal 
        show={showWithdraw} 
        onHide={() => setShowWithdraw(false)} 
        onWalletUpdate={handleWalletUpdate} 
      />
      <AccountModal show={showAccount} onHide={() => setShowAccount(false)} />
      <TransactionModal 
        show={showTransaction} 
        onHide={() => setShowTransaction(false)} 
        type={showTransaction} 
      />
      <TicketModal show={showTicket} onHide={() => setShowTicket(false)} />
      <WinnersModal show={showWinners} onHide={() => setShowWinners(false)} />
      <ReferralModal 
        show={showReferral} 
        onHide={() => setShowReferral(false)} 
        referralCode={referralCode} 
      />
      
      {/* Ticket Status Modal */}
      <Modal show={showTicketStatus} onHide={() => setShowTicketStatus(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Ticket Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>ID</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Evidence</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tickets.map(ticket => (
                <tr key={ticket.id}>
                  <td>{ticket.id}</td>
                  <td>{ticket.subject}</td>
                  <td>{ticket.message}</td>
                  <td>{ticket.evidence}</td>
                  <td>{ticket.status}</td>
                  <td>
                    {ticket.status !== 'closed' && (
                      <Button 
                        variant="primary" 
                        size="sm"
                        onClick={() => handleModifyTicket(ticket)}
                      >
                        Modify
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      
      {/* Ticket Modify Modal */}
      <Modal show={showTicketModify} onHide={() => setShowTicketModify(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modify Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Subject</Form.Label>
              <Form.Control 
                type="text" 
                defaultValue={selectedTicket?.subject}
                onChange={(e) => setSelectedTicket({...selectedTicket, subject: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                defaultValue={selectedTicket?.message}
                onChange={(e) => setSelectedTicket({...selectedTicket, message: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Evidence</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={3}
                defaultValue={selectedTicket?.evidence}
                onChange={(e) => setSelectedTicket({...selectedTicket, evidence: e.target.value})}
              />
            </Form.Group>
            
            {ticketResponses.length > 0 && (
              <div className="mb-3">
                <h5>Responses:</h5>
                {ticketResponses.map(response => (
                  <Alert key={response.id} variant="info">
                    {response.message}
                  </Alert>
                ))}
              </div>
            )}
            
            <Button 
              variant="primary" 
              className="w-100"
              style={{ backgroundColor: '#28a745', border: 'none' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#ffc107'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
              onClick={() => updateTicket(selectedTicket.id, {
                subject: selectedTicket.subject,
                message: selectedTicket.message,
                evidence: selectedTicket.evidence
              })}
            >
              Modify
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
      
      {/* CSS for WhatsApp bounce animation and responsive styles */}
      <style jsx>{`
        /* WhatsApp icon styles - Desktop */
        .whatsapp-icon-desktop {
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 1000;
          cursor: pointer;
          width: 60px;
          height: 60px;
          background-color: #25D366;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
          animation: bounce 2s infinite;
          transition: transform 0.3s ease;
        }
        
        .whatsapp-icon-desktop:hover {
          transform: scale(1.1);
          background-color: #128C7E;
        }
        
        /* WhatsApp icon styles - Mobile */
        .whatsapp-icon-mobile {
          position: fixed;
          bottom: 70px; /* Above the bottom navbar */
          right: 20px;
          z-index: 1000;
          cursor: pointer;
          color:white;
          background-color: #25D366;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 5px rgba(0,0,0,0.3);
          animation: bounce 2s infinite;
          transition: transform 0.3s ease;
        }
        
        .whatsapp-icon-mobile:hover {
          transform: scale(1.1);
          background-color: #128C7E;
        }
        
        /* Enhanced bounce animation */
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
        
        /* Mobile bottom navbar adjustments */
        @media (max-width: 992px) {
          .player-page {
            padding-bottom: 60px; /* Height of the fixed navbar */
          }
          
          .fixed-bottom {
            height: 60px;
          }
          
          .fixed-bottom .nav-link {
            padding: 5px 0;
          }
          
          .fixed-bottom .nav-link svg {
            font-size: 1.2rem;
          }
          
          .fixed-bottom .nav-link span {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
};
// Home Section Component
const HomeSection = () => {
  // Sample ads data
  const ads = [
    { id: 1, image: '/images/ad1.jpeg' },
    { id: 2, image: '/images/ad2.jpeg' },
    { id: 3, image: '/images/ad3.jpeg' },
    { id: 4, image: '/images/ad4.jpeg' },
  ];
  
  // Sample top games data
  const topGames = [
    { id: 1, name: 'Mega Slots', betAmount: '$1 - $100', image: '/images/megaslots.jpeg', link: '' },
    { id: 2, name: 'Blackjack Pro', betAmount: '$10 - $500', image: '/images/blackjack.png' },
    { id: 3, name: 'Roulette Live', betAmount: '$5 - $1000', image: '/images/roulette.png' },
    { id: 4, name: 'Poker Tournament', betAmount: '$20 - $1000', image: '/images/poker.png' },
  ];
  
  // Sample sports data
  const sports = [
    { id: 1, name: 'Football', image: '/images/football.jpg' },
    { id: 2, name: 'Basketball', image: '/images/basketball.jpg' },
    { id: 3, name: 'Tennis', image: '/images/tennis.png' },
    { id: 4, name: 'Cricket', image: '/images/cricket.webp' },
  ];
  
  const nextSectionRef = useRef(null);
  
  const handlePlayClick = () => {
    nextSectionRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <>
      <div className="player-page-container">
        <div 
          className="player-page-1 d-flex align-items-end"
          style={{ 
            backgroundImage: `url(${process.env.PUBLIC_URL + '/images/casino-background.jpg'})` 
          }}
        >
          <div className="content p-4">
            <h1 className="text-white mb-3">Your Ultimate Casino Experience!</h1>
            <p className="event-text text-white mb-4">Don't miss the Main Event</p>
            
            <Button 
              variant="primary" 
              size="lg" 
              onClick={handlePlayClick}
              className="play-button"
            >
              Play
            </Button>
          </div>
        </div>
      </div>
      
      {/* Ad Carousel */}
      <div className="ad-carousel mb-5">
        <h2 ref={nextSectionRef} className="section-title">Special Offers</h2>
        <div className="row">
          {ads.map(ad => (
            <div key={ad.id} className="col-6 col-md-3 mb-3">
              <img src={ad.image} alt={`Ad ${ad.id}`} className="img-fluid rounded" />
            </div>
          ))}
        </div>
      </div>
      
      {/* Top Games Section */}
      <div className="mb-5">
        <h2 className="section-title">Top Games</h2>
        <div className="row">
          {topGames.map(game => (
            <div key={game.id} className="col-6 col-md-3 mb-4">
              <Card className="game-card .card-bg-color">
                <Card.Img variant="top" src={game.image} />
                <Card.Body>
                  <Card.Title>{game.name}</Card.Title>
                  <Card.Text>Bet Amount: {game.betAmount}</Card.Text>
                  <Button className="join-btn" href={`http://20.205.26.16/api/tunnel/casino/odds/DRAGON_TIGER_20`}>
                    Join Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
      
      {/* Sports Section */}
      <div>
        <h2 className="section-title">Sports Betting</h2>
        <div className="row">
          {sports.map(sport => (
            <div key={sport.id} className="col-6 col-md-3 mb-4">
              <Card className="game-card card-bg-color">
                <Card.Img variant="top" src={sport.image} />
                <Card.Body>
                  <Card.Title>{sport.name}</Card.Title>
                  <Button className="join-btn" href={`/sports/${sport.id}`}>
                    Bet Now
                  </Button>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};
// Table Games Section Component
const TableGamesSection = () => {
  const tableGames = [
    { id: 1, name: 'Baccarat', betAmount: '$10 - $500', image: '/images/Baccarat.png', link: 'https://playpager.com/baccarat/' },
    { id: 2, name: 'Blackjack', betAmount: '$10 - $500', image: '/images/blackjack.png' },
    { id: 3, name: 'Craps', betAmount: '$5 - $500', image: '/images/craps.jpg' },
    { id: 4, name: 'Roulette', betAmount: '$5 - $1000', image: '/images/Roulette.png' },
    { id: 5, name: 'Poker', betAmount: '$20 - $1000', image: '/images/Poker.png' },
    { id: 6, name: 'Big Six Wheel', betAmount: '$1 - $50', image: '/images/bigsix.jpg' },
    { id: 7, name: 'Pool', betAmount: '$5 - $200', image: '/images/pool.png' },
  ];
  
  return (
    <div>
      <h2 className="section-title">Table Games</h2>
      <div className="row">
        {tableGames.map(game => (
          <div key={game.id} className="col-6 col-md-3 mb-4">
            <Card className="game-card card-bg-color">
              <Card.Img variant="top" src={game.image} />
              <Card.Body>
                <Card.Title>{game.name}</Card.Title>
                <Card.Text>Bet Amount: {game.betAmount}</Card.Text>
                <Button className="join-btn" href={`${game.link}`}>
                  Join Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};
// Gaming Machines Section Component
const GamingMachinesSection = () => {
  const gamingMachines = [
    { id: 1, name: 'Pachinko', betAmount: '$5 - $200', image: '/images/pachinko.png' },
    { id: 2, name: 'Slot Machine', betAmount: '$1 - $100', image: '/images/SlotMachines.png' },
    { id: 3, name: 'Video Lottery Terminal', betAmount: '$1 - $50', image: '/images/vlt.webp' },
    { id: 4, name: 'Video Poker', betAmount: '$1 - $100', image: '/images/videopoker.png' },
  ];
  
  return (
    <div>
      <h2 className="section-title">Gaming Machines</h2>
      <div className="row">
        {gamingMachines.map(game => (
          <div key={game.id} className="col-6 col-md-3 mb-4">
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
  );
};
// Numbers Games Section Component
const NumbersGamesSection = () => {
  const numbersGames = [
    { id: 1, name: 'Bingo', betAmount: '$1 - $50', image: '/images/bingo.png' },
    { id: 2, name: 'Keno', betAmount: '$1 - $100', image: '/images/keno.png' },
  ];
  
  return (
    <div>
      <h2 className="section-title">Numbers Games</h2>
      <div className="row">
        {numbersGames.map(game => (
          <div key={game.id} className="col-6 col-md-3 mb-4">
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
  );
};
// Live Casino Section Component
const LiveCasinoSection = () => {
  const liveCasinoGames = [
    { id: 1, name: 'Live Blackjack', betAmount: '$10 - $1000', image: '/images/liveblackjack.png' },
    { id: 2, name: 'Live Roulette', betAmount: '$5 - $1000', image: '/images/liveroulette.jpg' },
    { id: 3, name: 'Live Baccarat', betAmount: '$10 - $1000', image: '/images/livebaccarat.png' },
    { id: 4, name: 'Live Poker', betAmount: '$20 - $2000', image: '/images/livepoker.png' },
  ];
  
  return (
    <div>
      <h2 className="section-title">Live Casino</h2>
      <div className="row">
        {liveCasinoGames.map(game => (
          <div key={game.id} className="col-6 col-md-3 mb-4">
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
  );
};
// Tournaments Section Component
const TournamentsSection = () => {
  const tournaments = [
    { id: 1, name: 'Weekly Poker Championship', betAmount: '$50 entry', image: '/images/pokertournament.png' },
    { id: 2, name: 'Blackjack Tournament', betAmount: '$25 entry', image: '/images/blackjacktournament.png' },
    { id: 3, name: 'Slot Championship', betAmount: '$10 entry', image: '/images/slottournament.jpg' },
    { id: 4, name: 'Roulette Tournament', betAmount: '$20 entry', image: '/images/roulettetournament.jpg' },
  ];
  
  return (
    <div>
      <h2 className="section-title">Tournaments</h2>
      <div className="row">
        {tournaments.map(tournament => (
          <div key={tournament.id} className="col-6 col-md-3 mb-4">
            <Card className="game-card card-bg-color">
              <Card.Img variant="top" src={tournament.image} />
              <Card.Body>
                <Card.Title>{tournament.name}</Card.Title>
                <Card.Text>Entry Fee: {tournament.betAmount}</Card.Text>
                <Button className="join-btn" href={`/tournament/${tournament.id}`}>
                  Join Now
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <footer/>
    </div>
  );
};
export default Player;