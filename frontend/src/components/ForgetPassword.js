import React, { useState } from 'react';
import { FaLock, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const API_URL = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter your email');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/admin/forget-password`, { email });

      if (response.data.success) {
        setMessage(response.data.message || 'Password reset link sent to your email.');
        setError('');
      } else {
        setError(response.data.message || 'Something went wrong.');
        setMessage('');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Server error. Please try again later.');
      setMessage('');
    } finally {
      setLoading(false);
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