import React, { useState } from 'react';
import { FaLock } from 'react-icons/fa';
import axios from 'axios';
import './ChangePasswordModal.css';

const ChangePasswordModal = ({ onClose }) => {
  const [passwords, setPasswords] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
    otp: ''
  });
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!passwords.oldPassword) newErrors.oldPassword = 'Old password is required';
    if (!passwords.newPassword) newErrors.newPassword = 'New password is required';
    if (passwords.newPassword !== passwords.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!passwords.otp) newErrors.otp = 'OTP is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (validateStep1()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.post('/api/admin/request-otp', {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          setStep(2);
        }
      } catch (err) {
        setErrors({ form: err.response?.data?.message || 'Failed to request OTP' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (validateStep2()) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('adminToken');
        const response = await axios.post('/api/admin/change-password', {
          otp: passwords.otp
        }, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (response.data.success) {
          alert('Password changed successfully');
          onClose();
        }
      } catch (err) {
        setErrors({ form: err.response?.data?.message || 'Failed to change password' });
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content password-modal">
        <div className="modal-header">
          <h2>Change Password</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="modal-body">
          {errors.form && <div className="error">{errors.form}</div>}
          
          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <div className="form-group">
                <label><FaLock /> Old Password</label>
                <input
                  type="password"
                  name="oldPassword"
                  value={passwords.oldPassword}
                  onChange={handleChange}
                />
                {errors.oldPassword && <span className="error">{errors.oldPassword}</span>}
              </div>
              <div className="form-group">
                <label><FaLock /> New Password</label>
                <input
                  type="password"
                  name="newPassword"
                  value={passwords.newPassword}
                  onChange={handleChange}
                />
                {errors.newPassword && <span className="error">{errors.newPassword}</span>}
              </div>
              <div className="form-group">
                <label><FaLock /> Confirm New Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                />
                {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
              </div>
              
              <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Requesting OTP...' : 'Request OTP'}
                </button>
                <button type="button" onClick={onClose}>Cancel</button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleChangePassword}>
              <div className="otp-info">
                <p>An OTP has been sent to your registered mobile number.</p>
                <p>Please enter the OTP below to change your password.</p>
              </div>
              
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  name="otp"
                  value={passwords.otp}
                  onChange={handleChange}
                  placeholder="Enter OTP"
                />
                {errors.otp && <span className="error">{errors.otp}</span>}
              </div>
              
              <div className="form-actions">
                <button type="submit" disabled={isLoading}>
                  {isLoading ? 'Changing Password...' : 'Change Password'}
                </button>
                <button type="button" onClick={() => setStep(1)}>Back</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePasswordModal;