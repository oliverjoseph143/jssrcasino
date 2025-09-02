import React, { useState, useEffect, useRef } from 'react';
import { Form, Button, Alert, Container, Card, InputGroup } from 'react-bootstrap';
import myImage from '../asserts/casino-background.jpeg';
const OtpLogin = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(30);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (resendDisabled && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
  }, [resendDisabled, countdown]);

  const handleMobileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic mobile number validation
    if (!mobileNumber) {
      setError('Please enter your mobile number');
      setLoading(false);
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to send OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call:
      // const response = await fetch('/api/auth/send-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobileNumber })
      // });
      
      // if (!response.ok) throw new Error('Failed to send OTP');
      
      setShowOtpInput(true);
      setResendDisabled(true);
      setCountdown(30);
    } catch (err) {
      setError('Failed to send OTP. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setError('Please enter all 6 digits');
      setLoading(false);
      return;
    }

    try {
      // Simulate API call to verify OTP
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would make an API call:
      // const response = await fetch('/api/auth/verify-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobileNumber, otp: otpValue })
      // });
      
      // if (!response.ok) throw new Error('Invalid OTP');
      
      setSuccess(true);
    } catch (err) {
      setError('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(30);
    
    try {
      // Simulate API call to resend OTP
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, you would make an API call:
      // await fetch('/api/auth/resend-otp', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ mobileNumber })
      // });
    } catch (err) {
      setError('Failed to resend OTP. Please try again.');
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text/plain').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    for (let i = 0; i < pastedData.length; i++) {
      newOtp[i] = pastedData[i];
    }
    setOtp(newOtp);

    // Focus the next empty input or last input
    const nextIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[nextIndex].focus();
  };

  const handleBackToMobile = () => {
    setShowOtpInput(false);
    setOtp(['', '', '', '', '', '']);
    setError('');
  };

  if (success) {
    return (
      <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark">
        <Card className="text-center" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1a1a1a', borderColor: '#28a745' }}>
          <Card.Body>
            <div className="text-success mb-3">
              <i className="bi bi-check-circle-fill" style={{ fontSize: '3rem' }}></i>
            </div>
            <Card.Title className="text-success">Login Successful!</Card.Title>
            <Card.Text className="text-light">
              You have been successfully authenticated. Redirecting to dashboard...
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark" style={{backgroundImage: `url(${myImage})`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat',backgroundPosition: 'center center' , width:'100%'}}>
      <Container>
        <Card className="mx-auto" style={{ width: '100%', maxWidth: '400px', backgroundColor: '#1a1a1a', borderColor: '#28a745' }}>
          <Card.Body>
            {!showOtpInput ? (
              <>
                <Card.Title className="text-center mb-4 text-success fw-bold">Mobile Login</Card.Title>
                <Card.Text className="text-warning text-center mb-4">
                  Enter your mobile number to receive a verification code
                </Card.Text>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleMobileSubmit}>
                  <Form.Group className="mb-4" controlId="mobileNumber">
                    <Form.Label className="text-light">Mobile Number</Form.Label>
                    <InputGroup>
                      <InputGroup.Text style={{ backgroundColor: '#2a2a2a', borderColor: '#28a745', color: '#fff' }}>
                        +91
                      </InputGroup.Text>
                      <Form.Control
                        type="tel"
                        placeholder="Enter 10-digit number"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, ''))}
                        maxLength="10"
                        disabled={loading}
                        style={{ backgroundColor: '#2a2a2a', borderColor: '#28a745', color: '#fff' }}
                      />
                    </InputGroup>
                  </Form.Group>
                  
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </Form>
                
                <div className="text-center mt-4">
                  <Button 
                    variant="outline-light" 
                    href="/"
                    className="text-decoration-none"
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Card.Title className="text-center mb-4 text-success">Enter OTP</Card.Title>
                <Card.Text className="text-warning text-center mb-4">
                  We've sent a 6-digit code to <strong>+91 {mobileNumber}</strong>
                </Card.Text>
                
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form onSubmit={handleOtpSubmit}>
                  <div className="d-flex justify-content-between mb-4">
                    {otp.map((digit, index) => (
                      <Form.Control
                        key={index}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                        onPaste={index === 0 ? handlePaste : null}
                        ref={el => inputRefs.current[index] = el}
                        className="text-center"
                        style={{
                          width: '45px',
                          height: '45px',
                          fontSize: '1.5rem',
                          backgroundColor: '#2a2a2a',
                          borderColor: '#28a745',
                          color: '#fff'
                        }}
                      />
                    ))}
                  </div>
                  
                  <Button
                    variant="success"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Verifying...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  
                  <div className="text-center mb-3">
                    <Button
                      variant="link"
                      onClick={handleResend}
                      disabled={resendDisabled}
                      className="text-decoration-none"
                      style={{ color: resendDisabled ? '#6c757d' : '#28a745' }}
                    >
                      {resendDisabled
                        ? `Resend code in ${countdown}s`
                        : "Didn't receive code? Resend"}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <Button
                      variant="link"
                      onClick={handleBackToMobile}
                      className="text-decoration-none"
                      style={{ color: '#6c757d' }}
                    >
                      Change mobile number
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default OtpLogin;