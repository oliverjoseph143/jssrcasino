import React, { useState } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { FaGooglePay, FaCcMastercard, FaCcVisa, FaMoneyBillWave } from 'react-icons/fa';
import axios from 'axios';

const DepositModal = ({ show, onHide }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    if (!amount || !paymentMethod) {
      setError('Please fill all fields');
      setLoading(false);
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:5000/api/transactions/deposit',
        { amount, paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      if (response.data.success) {
        setSuccess('Deposit successful!');
        // Update wallet amount in UI would go here
        setTimeout(() => {
          onHide();
          window.location.reload(); // Simple way to refresh wallet amount
        }, 1500);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError('Deposit failed. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Deposit Funds</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}
        
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3 text-light">
            <Form.Label>Select Payment Method</Form.Label>
            <div className="d-grid gap-2">
              <Button 
                variant={paymentMethod === 'gpay' ? 'success' : 'outline-danger'}
                onClick={() => setPaymentMethod('gpay')}
                className="d-flex align-items-center justify-content-center"
              >
                <FaGooglePay className="me-2" size={24} /> Google Pay
              </Button>
              <Button 
                variant={paymentMethod === 'phonepe' ? 'success' : 'outline-primary'}
                onClick={() => setPaymentMethod('phonepe')}
                className="d-flex align-items-center justify-content-center"
              >
                <FaMoneyBillWave className="me-2" /> PhonePe
              </Button>
              <Button 
                variant={paymentMethod === 'paytm' ? 'success' : 'outline-info'}
                onClick={() => setPaymentMethod('paytm')}
                className="d-flex align-items-center justify-content-center"
              >
                <FaMoneyBillWave className="me-2" /> Paytm
              </Button>
              <Button 
                variant={paymentMethod === 'card' ? 'success' : 'outline-secondary'}
                onClick={() => setPaymentMethod('card')}
                className="d-flex align-items-center justify-content-center"
              >
                <FaCcVisa className="me-2" /> Credit/Debit Card
              </Button>
              <Button 
                variant={paymentMethod === 'bank' ? 'success' : 'outline-warning'}
                onClick={() => setPaymentMethod('bank')}
                className="d-flex align-items-center justify-content-center"
              >
                <FaMoneyBillWave className="me-2" /> Net Banking
              </Button>
            </div>
          </Form.Group>

          <Form.Group className="mb-3 text-light">
            <Form.Label>Amount ($)</Form.Label>
            <Form.Control
              className='bg-dark text-light'
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="1"
              required
            />
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="btn-custom w-100"
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Deposit'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default DepositModal;