import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaGoogle, FaFacebook } from 'react-icons/fa';
import axios from 'axios';
const LoginModal = ({ show, onHide, onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      if (response.data.success) {
        
        // Store token in localStorage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        // Redirect to player page
        window.location.href = '/player';
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Redirect to Google OAuth
    window.location.href = '/api/auth/google';
  };

  const handleFacebookLogin = () => {
    // Redirect to Facebook OAuth
    window.location.href = '/api/auth/facebook';
  };

  return (
    <Modal show={show} onHide={onHide} size="lg"  centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">LOGIN</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <Row>
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
            <img src="/images/casino-login.jpg" alt="Login" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Email address</Form.Label>
                <div className="input-group prepend">
                  <span className="input-group-text"><FaUser /></span>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete='off'
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="btn-custom w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center mb-3">
                <Button variant="outline-primary" className='p-2' style={{textDecoration:'none', color:'white'}} onClick={() => window.location.href = '/Otpsend'}>
                  Login with OTP
                </Button>
                <span className="mx-2">|</span>
                <Button variant="outline-primary" className='p-2'  style={{textDecoration:'none', color:'white'}} onClick={() => window.location.href = '/forgetpass'}>
                  Forgot Password?
                </Button>
              </div>

              <div className="text-center mb-3">
                <span style={{color:'red'}}>New? </span>
                <Button variant="outline-success" className=' p-2' style={{textDecoration:'none', color:'white'}} onClick={onSwitchToRegister}>
                  Register here
                </Button>
              </div>

              <div className="d-flex justify-content-center mb-3">
                <Button 
                  variant="outline-danger" 
                  className="me-2"
                  onClick={handleGoogleLogin}
                >
                  <FaGoogle className="me-1" /> 
                </Button>
                <Button 
                  variant="outline-primary"
                  onClick={handleFacebookLogin}
                >
                  <FaFacebook className="me-1" /> 
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;