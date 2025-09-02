import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Row, Col } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaMobile, FaCalendar, FaEdit, FaSave, FaTimes } from 'react-icons/fa';
import axios from 'axios';

const AccountModal = ({ show, onHide }) => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: ''
  });
  const [profileImage, setProfileImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
        setFormData({
          name: userData.name || '',
          email: userData.email || '',
          mobile: userData.mobile || '',
          dob: userData.dob ? userData.dob.split('T')[0] : ''
        });
        setPreviewImage(userData.profileImage || null);
      }
    }
  }, [show]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setProfileImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('mobile', formData.mobile);
      data.append('dob', formData.dob);
      
      if (profileImage) {
        data.append('profileImage', profileImage);
      }
      
      const response = await axios.put(
        '/api/users/update',
        data,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      
      if (response.data.success) {
        // Update user in localStorage
        const updatedUser = { ...user, ...formData };
        if (response.data.profileImage) {
          updatedUser.profileImage = response.data.profileImage;
        }
        localStorage.setItem('user', JSON.stringify(updatedUser));
        setUser(updatedUser);
        setSuccess('Profile updated successfully!');
        setEditMode(false);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyEmail = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/auth/send-email-otp',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        alert('OTP sent to your email. Please check and verify.');
        // In a real app, you would open a modal to enter OTP
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error(err);
    }
  };

  const handleVerifyMobile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        '/api/auth/send-mobile-otp',
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        alert('OTP sent to your mobile. Please check and verify.');
        // In a real app, you would open a modal to enter OTP
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to send OTP. Please try again.');
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Profile </Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Row>
          <Col md={4} className="text-center">
            <div className="mb-3">
              {previewImage ? (
                <img 
                  src={previewImage} 
                  alt="Profile" 
                  className="rounded-circle" 
                  width="150" 
                  height="150" 
                />
              ) : (
                <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" 
                     style={{ width: '150px', height: '150px' }}>
                  <FaUser size={60} />
                </div>
              )}
            </div>
            
            {editMode && (
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Form.Group>
            )}
            
            <div className="mb-2">
              <span className={user?.emailVerified ? 'text-success' : 'text-danger'}>
                Email: {user?.emailVerified ? 'Verified' : 'Not Verified'}
              </span>
              {!user?.emailVerified && (
                <Button variant="link" size="sm" onClick={handleVerifyEmail}>
                  Verify
                </Button>
              )}
            </div>
            
            <div>
              <span className={user?.mobileVerified ? 'text-success' : 'text-danger'}>
                Mobile: {user?.mobileVerified ? 'Verified' : 'Not Verified'}
              </span>
              {!user?.mobileVerified && (
                <Button variant="link" size="sm" onClick={handleVerifyMobile}>
                  Verify
                </Button>
              )}
            </div>
          </Col>
          
          <Col md={8}>
            {editMode ? (
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mobile Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={onChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={onChange}
                  />
                </Form.Group>

                <div className="d-flex justify-content-end">
                  <Button 
                    variant="secondary" 
                    className="me-2"
                    onClick={() => setEditMode(false)}
                  >
                    <FaTimes className="me-1" /> Cancel
                  </Button>
                  <Button 
                    variant="primary" 
                    onClick={handleSave}
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : <><FaSave className="me-1" /> Save</>}
                  </Button>
                </div>
              </Form>
            ) : (
              <div>
                <div className="mb-3">
                  <h5>Full Name</h5>
                  <p>{user?.name}</p>
                </div>

                <div className="mb-3">
                  <h5>Email address</h5>
                  <p>{user?.email}</p>
                </div>

                <div className="mb-3">
                  <h5>Mobile Number</h5>
                  <p>{user?.mobile}</p>
                </div>

                <div className="mb-3">
                  <h5>Date of Birth</h5>
                  <p>{user?.dob ? new Date(user.dob).toLocaleDateString() : 'Not provided'}</p>
                </div>

                <Button 
                  variant="primary"
                  onClick={() => setEditMode(true)}
                >
                  <FaEdit className="me-1" /> Edit Profile
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default AccountModal;