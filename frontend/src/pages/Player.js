import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Dropdown, Card, Button, Modal, Form, Alert } from 'react-bootstrap';
import { FaUser, FaWallet, FaMoneyBillWave, FaMoneyCheckAlt, FaCog, FaHistory, FaTicketAlt, FaTrophy, FaShareAlt, FaSignOutAlt, FaHome, FaTable, FaGamepad, FaHashtag, FaDice, FaUsers } from 'react-icons/fa';
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
// const [showUserMenu1, setShowUserMenu1] = useState(true);
  const [showModalStatus, setShowModalStatus] = useState(false);
  const [tickets, setTickets] = useState([]);

  // Fetch ticket data when modal is opened
  useEffect(() => {
    if (showModalStatus) {
      axios.get('http://localhost:5000/api/tickets/status')
        .then(response => setTickets(response.data))
        .catch(error => console.error('Error fetching tickets:', error));
    }
  }, [showModalStatus]);



  useEffect(() => {
    // Get user data from localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
      // Fetch wallet balance from API
     
      setWalletAmount(userData?.wallet_balance);
    } else {
      // Redirect to home if not logged in
      window.location.href = '/';
    }
  }, []);


  

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
  };

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
      {/* Player Navbar */}
      <Navbar bg="success" variant="success" expand="lg" className="player-navbar justify-content-between ps-4 mb-3">
        <Navbar.Brand href="#home" className='text-warning fw-bolder'>
          <img src="./images/logo.jpg" alt="Logo" width="30" height="30" className="d-inline-block align-top rounded-circle" />
          {' '} GOODLUCK CASINO
        </Navbar.Brand>
        
        <div className="d-flex justify-content-end me-4">
  <span className="me-3 mt-1 text-light fw-bold">Welcome, {user?.name}</span>
  
  <div className="me-3 d-flex align-items-center p-2 bg-warning text-danger rounded-pill me-5">
    <FaWallet className="me-2 ms-2" />
    <span>${walletAmount}</span>
  </div>

  <div className="position-relative ms-1">
    <div className="user-dropdown position-absolute top-0 end-0">
      <Button 
        variant="outline-light" 
        onClick={() => setShowUserMenu(!showUserMenu)}
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
              <Button 
                    variant="outline-light" 
                    size="sm"
                    onClick={() => { setShowUserMenu(false); setShowTicket(true); }}
                  >
                    <FaTicketAlt className="me-1" /> Ticket
                  </Button>
        
  
      





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
</div>
      </Navbar>
      


      {/* Second Navbar */}
<Navbar bg="success" variant="success" className="player-navbar py-2">
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


      {/* Main Content */}
      <div className="container my-4">
        {renderActiveSection()}
      </div>
       
      {/* Footer */}
      <Footer />

      {/* Modals */}
      <DepositModal show={showDeposit} onHide={() => setShowDeposit(false)} />
      <WithdrawModal show={showWithdraw} onHide={() => setShowWithdraw(false)} />
      <AccountModal show={showAccount} onHide={() => setShowAccount(false)} />
      <TransactionModal 
        show={showTransaction} 
        onHide={() => setShowTransaction(false)} 
        type={showTransaction} 
      />
      <TicketModal show={showTicket} onHide={() => setShowTicket(false)} />
      <WinnersModal show={showWinners} onHide={() => setShowWinners(false)} />
      <ReferralModal show={showReferral} onHide={() => setShowReferral(false)} />
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
    { id: 1, name: 'Mega Slots', betAmount: '$1 - $100', image: '/images/megaslots.jpeg',link:'' },
    { id: 2, name: 'Blackjack Pro', betAmount: '$10 - $500', image: '/images/blackjack.webp' },
    { id: 3, name: 'Roulette Live', betAmount: '$5 - $1000', image: '/images/roulette.webp' },
    { id: 4, name: 'Poker Tournament', betAmount: '$20 - $1000', image: '/images/poker.avif' },
  ];

  // Sample sports data
  const sports = [
    { id: 1, name: 'Football', image: '/images/football.jpg' },
    { id: 2, name: 'Basketball', image: '/images/basketball.jpg' },
    { id: 3, name: 'Tennis', image: '/images/tennis.avif' },
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
      {/* Hero Image */}
      <div className="hero-image mb-4">
        <img src="/images/Craps.jpg" alt="Casino" className="img-fluid w-100 rounded" style={{ height: '0vh', objectFit: 'cover' }} />
      </div>

      {/* Ad Carousel */}
      <div className="ad-carousel mb-5">
        <h2 ref={nextSectionRef} className="section-title">Special Offers</h2>
        <div className="row">
          {ads.map(ad => (
            <div key={ad.id} className="col-md-3 col-sm-6 mb-3">
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
            <div key={game.id} className="col-md-3 col-sm-6 mb-4">
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
            <div key={sport.id} className="col-md-3 col-sm-6 mb-4">
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
    { id: 1, name: 'Baccarat', betAmount: '$10 - $500', image: '/images/Baccarat.avif',link :'https://playpager.com/baccarat/' },
    { id: 2, name: 'Blackjack', betAmount: '$10 - $500', image: '/images/blackjack.webp' },
    { id: 3, name: 'Craps', betAmount: '$5 - $500', image: '/images/craps.jpg' },
    { id: 4, name: 'Roulette', betAmount: '$5 - $1000', image: '/images/Roulette.webp' },
    { id: 5, name: 'Poker', betAmount: '$20 - $1000', image: '/images/Poker.avif' },
    { id: 6, name: 'Big Six Wheel', betAmount: '$1 - $50', image: '/images/bigsix.jpg' },
    { id: 7, name: 'Pool', betAmount: '$5 - $200', image: '/images/pool.avif' },
  ];

  return (
    <div>
      <h2 className="section-title">Table Games</h2>
      <div className="row">
        {tableGames.map(game => (
          <div key={game.id} className="col-md-3 col-sm-6 mb-4">
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
    { id: 1, name: 'Pachinko', betAmount: '$5 - $200', image: '/images/pachinko.webp' },
    { id: 2, name: 'Slot Machine', betAmount: '$1 - $100', image: '/images/SlotMachines.webp' },
    { id: 3, name: 'Video Lottery Terminal', betAmount: '$1 - $50', image: '/images/vlt.webp' },
    { id: 4, name: 'Video Poker', betAmount: '$1 - $100', image: '/images/videopoker.jpg' },
  ];

  return (
    <div>
      <h2 className="section-title">Gaming Machines</h2>
      <div className="row">
        {gamingMachines.map(game => (
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
  );
};

// Numbers Games Section Component
const NumbersGamesSection = () => {
  const numbersGames = [
    { id: 1, name: 'Bingo', betAmount: '$1 - $50', image: '/images/bingo.png' },
    { id: 2, name: 'Keno', betAmount: '$1 - $100', image: '/images/keno1.webp' },
  ];

  return (
    <div>
      <h2 className="section-title">Numbers Games</h2>
      <div className="row">
        {numbersGames.map(game => (
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
  );
};

// Live Casino Section Component
const LiveCasinoSection = () => {
  const liveCasinoGames = [
    { id: 1, name: 'Live Blackjack', betAmount: '$10 - $1000', image: '/images/liveblackjack.avif' },
    { id: 2, name: 'Live Roulette', betAmount: '$5 - $1000', image: '/images/liveroulette.jpg' },
    { id: 3, name: 'Live Baccarat', betAmount: '$10 - $1000', image: '/images/livebaccarat.avif' },
    { id: 4, name: 'Live Poker', betAmount: '$20 - $2000', image: '/images/livepoker.avif' },
  ];

  return (
    <div>
      <h2 className="section-title">Live Casino</h2>
      <div className="row">
        {liveCasinoGames.map(game => (
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
  );
};

// Tournaments Section Component
const TournamentsSection = () => {
  const tournaments = [
    { id: 1, name: 'Weekly Poker Championship', betAmount: '$50 entry', image: '/images/pokertournament.avif' },
    { id: 2, name: 'Blackjack Tournament', betAmount: '$25 entry', image: '/images/blackjacktournament.avif' },
    { id: 3, name: 'Slot Championship', betAmount: '$10 entry', image: '/images/slottournament.jpg' },
    { id: 4, name: 'Roulette Tournament', betAmount: '$20 entry', image: '/images/roulettetournament.jpg' },
  ];

  return (
    <div>
      <h2 className="section-title">Tournaments</h2>
      <div className="row">
        {tournaments.map(tournament => (
          <div key={tournament.id} className="col-md-3 col-sm-6 mb-4">
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
    </div>
  );
};

export default Player;