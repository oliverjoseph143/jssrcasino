import React, { useState } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { FaUser, FaLock, FaEye, FaEyeSlash, FaEnvelope, FaMobile, FaCalendar } from 'react-icons/fa';
import axios from 'axios';

const RegisterModal = ({ show, onHide, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, mobile, dob, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        mobile,
        dob,
        password
      });
      
      if (response.data.success) {
        // Show success message and switch to login
        alert('Registration successful! Please login.');
        onSwitchToLogin();
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title className="w-100 text-center">Register</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        <Row>
          <Col md={6} className="d-none d-md-flex align-items-center justify-content-center">
            <img src="/images/casino-login.webp" alt="Register" className="img-fluid rounded" />
          </Col>
          <Col md={6}>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaUser /></span>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaEnvelope /></span>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaMobile /></span>
                  <Form.Control
                    type="tel"
                    placeholder="Enter mobile number"
                    name="mobile"
                    value={mobile}
                    onChange={onChange}
                    required
                  />
                </div>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Date of Birth</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaCalendar /></span>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={dob}
                    onChange={onChange}
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
                    name="password"
                    value={password}
                    onChange={onChange}
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

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-group">
                  <span className="input-group-text"><FaLock /></span>
                  <Form.Control
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={onChange}
                    required
                  />
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </div>
              </Form.Group>

              <Button 
                variant="primary" 
                type="submit" 
                className="btn-custom w-100 mb-3"
                disabled={loading}
              >
                {loading ? 'Registering...' : 'Register'}
              </Button>

              <div className="text-center">
                <span style={{color:'white'}}>Already have an account? </span>
                <Button variant="outline-success" className='p-2 ' onClick={onSwitchToLogin}>
                  Login here
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default RegisterModal;