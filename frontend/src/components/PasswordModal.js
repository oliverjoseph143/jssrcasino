import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';

const PasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('❌ New passwords do not match');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/admin/change-password`,
        {
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          otp: formData.otp
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      if (response.data.success) {
        setMessage(' Password changed successfully');
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setMessage(response.data.message || 'Failed to change password');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || ' Server error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label><FaLock /> Old Password</label>
            <input 
              type="password" 
              name="oldPassword" 
              value={formData.oldPassword} 
              onChange={handleChange} 
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label><FaLock /> New Password</label>
            <input 
              type="password" 
              name="newPassword" 
              value={formData.newPassword} 
              onChange={handleChange} 
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label><FaLock /> Confirm New Password</label>
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label><FaLock /> OTP</label>
            <input 
              type="text" 
              name="otp" 
              value={formData.otp} 
              onChange={handleChange} 
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Change Password</button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;