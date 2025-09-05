import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import myImage from '../asserts/fbac.jpg';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Basic email validation
    if (!email) {
      setError('Please enter your email address');
      setLoading(false);
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

       try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email }),
        }
      );
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to send password');
      }
      
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Failed to send password. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex justify-content-center align-items-center bg-dark" 
         style={{backgroundImage: `url(${myImage})`, backgroundSize: 'cover', 
                 backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', width:'100%'}}>
      <Container>
        <Card 
          className="mx-auto" 
          style={{ 
            width: '100%', 
            maxWidth: '400px',
            backgroundColor: '#1a1a1a',
            borderColor: '#28a745'
          }}
        >
          <Card.Body>
            <Card.Title className="text-center mb-4 text-success fw-bold">Retrieve Password</Card.Title>
            
            {success ? (
              <Alert variant="success" className="bg-success bg-opacity-10 border-success">
                <Alert.Heading className="text-success">Password Sent!</Alert.Heading>
                <p className="text-light">
                  We've sent your password to <strong>{email}</strong>. 
                  Please check your inbox.
                </p>
                <p className="mb-0 text-light">
                  Didn't receive the email? Check your spam folder or{' '}
                  <Button 
                    variant="link" 
                    className="p-0 align-baseline text-success"
                    onClick={() => {
                      setSuccess(false);
                      setError('');
                    }}
                  >
                    try again
                  </Button>
                </p>
              </Alert>
            ) : (
              <>
                <p className="text-warning text-center mb-4">
                  Enter your email address and we'll send you your password.
                </p>
                
                {error && <Alert variant="danger" className="bg-danger bg-opacity-10 border-danger text-light">{error}</Alert>}
                
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="text-light">Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={loading}
                      required
                      style={{
                        backgroundColor: '#2a2a2a',
                        borderColor: '#28a745',
                        color: '#fff'
                      }}
                    />
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
                        Sending Password...
                      </>
                    ) : (
                      'Send Password'
                    )}
                  </Button>
                </Form>
                
                <div className="text-center mt-3">
                  <Button 
                    variant="outline-light" 
                    href="/"
                    className="text-decoration-none"
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ForgotPassword;