import React, { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/forget-password', {
        email
      });

      setMessage(response.data.message);
      setError('');
    } catch (err) {
      setError('Server error. Please try again later.');
      setMessage('');
    }
  };

  return (
    <div className="container">
      <div className="login-container">
        <div className="login-form">
          <h1 className="login-title">FORGOT PASSWORD</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaLock className="input-icon" />
            </div>
            {error && <div className="error-message">{error}</div>}
            {message && <div style={{ color: '#00ff00', textAlign: 'center', margin: '10px 0' }}>{message}</div>}
            <button type="submit" className="btn">RESET PASSWORD</button>
          </form>
          <a href="/" className="link">
            <FaArrowLeft style={{ marginRight: '5px' }} /> Back to Login
          </a>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;