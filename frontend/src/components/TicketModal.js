import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';

const TicketModal = ({ show, onHide }) => {
  const [user, setUser] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [evidence, setEvidence] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show) {
      // Get user data from localStorage
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        setUser(userData);
      }
    }
  }, [show]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!subject || !message) {
      setError('Please fill all required fields');
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const data = new FormData();
      data.append('subject', subject);
      data.append('message', message);
      data.append('email', user?.email);
      
      if (evidence) {
        data.append('evidence', evidence);
      }
      
      const response = await axios.post(
        '/api/tickets/create',
        data,
        { 
          headers: { 
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data'
          } 
        }
      );
      
      if (response.data.success) {
        setSuccess('Ticket submitted successfully!');
        setSubject('');
        setMessage('');
        setEvidence(null);
        setTimeout(() => {
          onHide();
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Failed to submit ticket. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Submit a Ticket</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-light">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={user?.email || ''}
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3 text-light">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 text-light">
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Describe your issue or question"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 text-light">
            <Form.Label>Evidence (optional)</Form.Label>
            <Form.Control
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setEvidence(e.target.files[0])}
            />
            <Form.Text className="text-muted">
              Upload a screenshot or PDF as evidence (max 5MB)
            </Form.Text>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="btn-custom w-100"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit Ticket'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default TicketModal;