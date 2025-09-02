import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import './AccountSettingModal.css';

const AccountSettingModal = ({ admin, onClose }) => {
  const [formData, setFormData] = useState({
    name: admin.name,
    email: admin.email,
    mobile: admin.mobile,
    photo: null
  });
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const token = localStorage.getItem('adminToken');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      if (formData.photo) {
        data.append('photo', formData.photo);
      }

      const response = await axios.put('/api/admin/update', data, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.success) {
        alert('Profile updated successfully');
        window.location.reload();
      }
    } catch (err) {
      alert('Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content account-modal">
        <div className="modal-header">
          <h2>Profile</h2>
          <button onClick={onClose} className="close-btn">&times;</button>
        </div>
        
        <div className="modal-body">
          <div className="account-info">
            <div className="info-column">
              <div className="profile-photo">
                <img 
                  src={formData.photo ? URL.createObjectURL(formData.photo) : `/images/admins/${admin.photo}`} 
                  alt="Admin" 
                />
                {isEditing && (
                  <label className="photo-upload">
                    <FaCamera />
                    <input type="file" onChange={handlePhotoChange} />
                  </label>
                )}
              </div>
              <div className="info-item">
                <span className="info-label">Name:</span>
                <span className="info-value">{admin.name}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Admin Type:</span>
                <span className="info-value">{admin.admin_type}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">{admin.email}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Mobile:</span>
                <span className="info-value">{admin.mobile}</span>
              </div>
            </div>
            
            <div className="form-column">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label><FaUser /> Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label><FaEnvelope /> Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                <div className="form-group">
                  <label><FaPhone /> Mobile</label>
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="form-actions">
                  {isEditing ? (
                    <>
                      <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Updating...' : 'Update'}
                      </button>
                      <button type="button" onClick={() => setIsEditing(false)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button type="button" onClick={() => setIsEditing(true)}>
                      Edit Profile
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSettingModal;