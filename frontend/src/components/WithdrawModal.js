import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import axios from 'axios';
import { FaGooglePay, FaUniversity, FaPhone } from 'react-icons/fa';
import { SiPaytm, SiPhonepe } from 'react-icons/si';

const WithdrawModal = ({ show, onHide }) => {
  const [amount, setAmount] = useState('');

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState('');

  const handlePaymentMethodClick = (method) => {
    const templates = {
      gpay: 'GPay UPI ID: your-upi-id@okicici',
      paytm: 'Paytm Number: 9876543210',
      phonepe: 'PhonePe Number: 9876543210',
      bank: 'Bank Account:\nAccount Number: 1234567890\nIFSC Code: ABCD0123456\nBank Name: Your Bank Name'
    };
    
    setPaymentDetails(templates[method] || '');
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!amount || !paymentDetails) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/transactions/withdraw',
        { amount, paymentDetails },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setSuccess('Withdrawal request submitted successfully!');
        setTimeout(() => {
          onHide();
          window.location.reload(); // Simple way to refresh wallet amount
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Withdrawal failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Withdraw Funds</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark'>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-light">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3 text-light">
      <Form.Label>Payment Details</Form.Label>
      
      {/* Payment Method Icons */}
      <div className="d-flex gap-2 mb-3">
        <Button 
          variant="outline-danger" 
          size="sm"
          onClick={() => handlePaymentMethodClick('gpay')}
          title="GPay"
        >
          <FaGooglePay size={24} />
        </Button>
        
        <Button 
          variant="outline-primary" 
          size="sm"
          onClick={() => handlePaymentMethodClick('paytm')}
          title="Paytm"
        >
          <SiPaytm size={24} />
        </Button>
        
        <Button 
          variant="outline-info" 
          size="sm"
          onClick={() => handlePaymentMethodClick('phonepe')}
          title="PhonePe"
        >
          <SiPhonepe size={24} />
        </Button>
        
        <Button 
          variant="outline-light" 
          size="sm"
          onClick={() => handlePaymentMethodClick('bank')}
          title="Bank Account"
        >
          <FaUniversity size={24} />
        </Button>
      </div>
      
      <Form.Control
        as="textarea"
        rows={4}
        placeholder="Enter your payment details (UPI ID, Bank Account, etc.)"
        value={paymentDetails}
        onChange={(e) => setPaymentDetails(e.target.value)}
        disabled
        required
      />
    </Form.Group>
  

          <Button 
            variant="primary" 
            type="submit" 
            className="btn-custom w-100"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Withdraw'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WithdrawModal;