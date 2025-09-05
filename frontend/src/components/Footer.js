import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope, FaStar, FaPhone, FaPinterest } from 'react-icons/fa';
import pr from '../components/privacypolicy';
import { Link } from 'react-router-dom';

const Footer = () => {
  // Player reviews data
  const playerReviews = [
    { id: 1, name: "Rajesh Kumar", rating: 5, location: "Chennai" },
    { id: 2, name: "Priya Sharma", rating: 4, location: "Coimbatore" },
    { id: 3, name: "Vijay Anand", rating: 5, location: "Madurai" },
    { id: 4, name: "Deepa Nair", rating: 4, location: "Tiruchirappalli" },
    { id: 5, name: "Karthik Reddy", rating: 5, location: "Salem" },
    { id: 6, name: "Meena Patel", rating: 4, location: "Tirunelveli" },
    { id: 7, name: "Suresh Iyer", rating: 5, location: "Tiruppur" },
    { id: 8, name: "Anita Desai", rating: 4, location: "Vellore" }
  ];
  
  // Game providers data
  const gameProviders = [
    { id: 1, name: "NetEnt", image: "/images/providers/1.png" },
    { id: 2, name: "Microgaming", image: "/images/providers/2.webp" },
    { id: 3, name: "Playtech", image: "/images/providers/3.png" },
    { id: 4, name: "Evolution", image: "/images/providers/5.png" },
    { id: 5, name: "Betsoft", image: "/images/providers/6.webp" },
    { id: 6, name: "Play'n GO", image: "/images/providers/7.png" },
    { id: 7, name: "Quickspin", image: "/images/providers/9.webp" },
    { id: 8, name: "Yggdrasil", image: "/images/providers/10.png" }
  ];
  
  // Payment methods data
  const paymentMethods = [
    { id: 1, image: "/images/payments/1.png" },
    { id: 2, image: "/images/payments/2.png" },
    { id: 3, image: "/images/payments/3.png" },
    { id: 4, image: "/images/payments/4.png" },
    { id: 5, image: "/images/payments/5.png" },
    { id: 6, image: "/images/payments/6.png" },
    { id: 7, image: "/images/payments/7.png" },
    { id: 8, image: "/images/payments/8.png" },
    { id: 9, image: "/images/payments/9.png" },
    { id: 10, image: "/images/payments/10.png" },
    { id: 11, image: "/images/payments/11.png" },
    { id: 12, image: "/images/payments/12.png" },
    { id: 13, image: "/images/payments/13.svg" }
  ];

  return (
    <footer className="footer mt-5">
      {/* Player Reviews Section with Black Background */}
      <div className="bg-black text-white py-4">
        <Container>
          <h2 className="text-center mb-4">Player Reviews</h2>
          <div className="reviews-container">
            <div className="reviews-scroll d-flex">
              {playerReviews.map((player) => (
                <div key={player.id} className="player-card mx-2 bg-dark p-3 rounded">
                  <div className="text-center mb-2">
                    <div className="user-logo mx-auto mb-2 bg-success rounded-circle d-flex align-items-center justify-content-center" 
                         style={{ width: '60px', height: '60px' }}>
                      <span className="fw-bold">{player.name.charAt(0)}</span>
                    </div>
                    <div className="rating d-flex justify-content-center align-items-center">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={i < player.rating ? "text-warning" : "text-secondary"} />
                      ))}
                      <span className="ms-1">{player.rating}/5</span>
                    </div>
                  </div>
                  <hr className="my-2 bg-light" />
                  <p className="text-center mb-2">Good luck casino is best.</p>
                  <hr className="my-2 bg-light" />
                  <p className="text-center text-light">{player.name}, {player.location}</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Original Footer with Green Background */}
      <div className="bg-success text-white py-4">
        <Container>
          <Row className="g-4">
            {/* Column 1: Logo and Description */}
            <Col xs={12} md={3} className="mb-3">
              <div className="text-center text-md-start">
                <h5><img src="/images/logo.png" alt="" className="mb-3" style={{ maxWidth: '30px' }} />
                GOODLUCK Casino</h5>
                <p className="small">
                  Experience the thrill of winning at GOODLUCK Casino, your premier destination for online gaming. 
                  We offer a wide range of casino games, sports betting, and exciting promotions.
                </p>
                <div className="mt-3">
                  <span className="text-warning fw-bold">18+</span> Be Responsible
                </div>
              </div>
            </Col>
            
            {/* Column 2: Menu */}
            <Col xs={6} md={3} className="mb-3">
              <h5>Menu</h5>
              <ul className="list-unstyled small">
                <li><a href="#online-casino" className="text-white text-decoration-none">Online Casino Games</a></li>
                <li><a href="#offers" className="text-white text-decoration-none">Casino Bonus & Offers</a></li>
                <li><a href="#affiliate" className="text-white text-decoration-none">Affiliate</a></li>
                <li><a href="#tournaments" className="text-white text-decoration-none">Tournaments</a></li>
                <li><a href="#vip" className="text-white text-decoration-none">VIP</a></li>
                <li><a href="#download-app" className="text-white text-decoration-none">Download App</a></li>
              </ul>
            </Col>
            
            {/* Column 3: Quick Links */}
            <Col xs={6} md={3} className="mb-3">
              <h5>Quick Links</h5>
              <ul className="list-unstyled small">
                <li><a href="#faq" className="text-white text-decoration-none">FAQ’s</a></li>
                <li><a href="#contact" className="text-white text-decoration-none">Contact Us</a></li>
                <li><a href="#about" className="text-white text-decoration-none">About Us</a></li>
                <li><a href="#aml-kyc" className="text-white text-decoration-none">AML & KYC</a></li>
                <li><a href="#responsible-gambling" className="text-white text-decoration-none">Responsible Gambling</a></li>
                <li><a href="#privacy-policy" className="text-white text-decoration-none">Privacy Policy</a></li>
                <li><a href="#terms-conditions" className="text-white text-decoration-none">Terms & Conditions</a></li>
              </ul>
            </Col>
            
            {/* Column 4: Get in Touch */}
            <Col xs={12} md={3} className="mb-3">
              <h5>Get in Touch</h5>
              <div className="social-icons d-flex justify-content-center justify-content-md-start gap-3 mb-3">
                <a href="https://facebook.com/goodluckcasino" target="_blank" rel="noopener noreferrer" className="text-white">
                  <FaFacebook size={24} />
                </a>
                <a href="https://instagram.com/goodluckcasino" target="_blank" rel="noopener noreferrer" className="text-white">
                  <FaInstagram size={24} />
                </a>
                <a href="https://twitter.com/goodluckcasino" target="_blank" rel="noopener noreferrer" className="text-white">
                  <FaTwitter size={24} />
                </a>
                <a href="https://pinterest.com/goodluckcasino" target="_blank" rel="noopener noreferrer" className="text-white">
                  <FaPinterest size={24} />
                </a>
              </div>
              <div className="contact-info small">
                <p className="mb-1 d-flex align-items-center">
                  <FaPhone className="me-2" /> +1 (800) 123-4567
                </p>
                <p className="d-flex align-items-center">
                  <FaEnvelope className="me-2" /> goodluckcasino@gmail.com
                </p>
              </div>
            </Col>
          </Row>
          
          {/* Game Providers Section */}
          <Row className="mt-4">
            <Col xs={12}>
              <h5 className="text-center mb-3" style={{textDecoration:'underline',backgroundColor:'black',padding:'5px'}}>Game Providers</h5>
              <div className="providers-container">
                <div className="providers-scroll d-flex">
                  {gameProviders.map((provider) => (
                    <div key={provider.id} className="provider-logo mx-3">
                      <img 
                        src={provider.image} 
                        alt={provider.name} 
                        className="img-fluid" 
                        style={{ maxHeight: '50px' }} 
                      />
                    </div>
                  ))}
                </div>
              </div>
            </Col>
          </Row>
          
          {/* Payment Methods Section */}
          <Row className="mt-4">
            <Col xs={12}>
              <h5 className="text-center mb-3" style={{textDecoration:'underline',backgroundColor:'black',padding:'5px'}}>Payment Methods</h5>
              
              {/* Desktop View: 2 rows (7 and 6 items) */}
              <div className="d-none d-md-block">
                <Row className="justify-content-center mb-3">
                  {paymentMethods.slice(0, 7).map((method) => (
                    <Col key={method.id} xs={4} md={1} className="d-flex justify-content-center mb-3">
                      <img 
                        src={method.image} 
                        alt={`Payment method ${method.id}`} 
                        className="img-fluid" 
                        style={{ maxHeight: '40px' }} 
                      />
                    </Col>
                  ))}
                </Row>
                <Row className="justify-content-center">
                  {paymentMethods.slice(7, 13).map((method) => (
                    <Col key={method.id} xs={4} md={2} className="d-flex justify-content-center mb-3">
                      <img 
                        src={method.image} 
                        alt={`Payment method ${method.id}`} 
                        className="img-fluid" 
                        style={{ maxHeight: '40px' }} 
                      />
                    </Col>
                  ))}
                </Row>
              </div>
              
              {/* Mobile View: 3 columns per row */}
              <div className="d-md-none">
                <Row className="justify-content-center">
                  {paymentMethods.map((method, index) => (
                    <Col 
                      key={method.id} 
                      xs={4} 
                      className={`d-flex justify-content-center mb-3 ${index === paymentMethods.length - 1 ? 'offset-4' : ''}`}
                    >
                      <img 
                        src={method.image} 
                        alt={`Payment method ${method.id}`} 
                        className="img-fluid" 
                        style={{ maxHeight: '40px' }} 
                      />
                    </Col>
                  ))}
                </Row>
              </div>
            </Col>
          </Row>
          
          <hr className="my-4 bg-light" />
          
          <Row>
            <Col className="text-center">
              <p className="mb-0 small">&copy; {new Date().getFullYear()} GOODLUCK Casino. All rights reserved.</p>
            </Col>
          </Row>
        </Container>
      </div>
      
      <style jsx>{`
        .reviews-container {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
        }
        
        .reviews-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .reviews-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .player-card {
          flex: 0 0 250px;
          display: inline-block;
          vertical-align: top;
        }
        
        /* Game Providers Styles */
        .providers-container {
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE and Edge */
          background: transparent;
        }
        
        .providers-container::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
        
        .providers-scroll {
          animation: scroll 20s linear infinite;
          display: flex;
        }
        
        .provider-logo {
          flex: 0 0 auto;
          display: inline-block;
          background: transparent;
        }
        
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @media (max-width: 768px) {
          .player-card {
            flex: 0 0 200px;
          }
          
          .user-logo {
            width: 50px !important;
            height: 50px !important;
          }
          
          .provider-logo img {
            max-height: 40px !important;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;