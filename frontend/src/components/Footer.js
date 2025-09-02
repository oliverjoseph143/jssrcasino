import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import pr from '../components/privacypolicy';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer mt-5">
      <Container>
        <Row>
          <Col md={3} sm={6}>
            <h5>GOODLUCK Casino</h5>
            <p>
              Experience the thrill of winning at GOODLUCK Casino, your premier destination for online gaming. 
              We offer a wide range of casino games, sports betting, and exciting promotions.
            </p>
          </Col>
          <Col md={3} sm={6}>
            <h5>Menu</h5>
            <ul className="list-unstyled">
              <li><a href="#online-casino">Online Casino</a></li>
              <li><a href="#offers">Offers</a></li>
              <li><a href="#jeet-privileges">Jeet Privileges</a></li>
              <li><a href="#tournaments">Tournaments</a></li>
              <li><a href="#vip">VIP</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#about">About</a></li>
              
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#terms-conditions">Terms & Conditions</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <h5>Get in Touch</h5>
            <div className="social-icons">
              <a href="#facebook"><FaFacebook /></a>
              <a href="#twitter"><FaTwitter /></a>
              <a href="#instagram"><FaInstagram /></a>
              <a href="#email"><FaEnvelope /></a>
            </div>
            <p className="mt-3">
              Email: goodluckcasino@gmail.com<br />
             
            </p>
          </Col>
        </Row>
        <hr className="my-4 bg-light" />
        <Row>
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} GOODLUCK Casino. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;