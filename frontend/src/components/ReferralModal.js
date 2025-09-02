import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import { FaCopy } from 'react-icons/fa';
import axios from 'axios';

const ReferralModal = ({ show, onHide }) => {
  const [referralData, setReferralData] = useState({
    referralCode: '',
    referralLink: '',
    referrals: []
  });
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (show) {
      fetchReferralData();
    }
  }, [show]);

  const fetchReferralData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/referrals', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setReferralData(response.data);
      }
    } catch (err) {
      console.error('Failed to fetch referral data:', err);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Referral Program</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        {loading ? (
          <p>Loading referral data...</p>
        ) : (
          <>
            <div className="mb-4">
              <h5>Your Referral Code</h5>
              <div className="d-flex align-items-center">
                <span className="bg-light p-2 rounded me-2">{referralData.referralCode}</span>
                <Button variant="outline-primary" onClick={() => copyToClipboard(referralData.referralCode)}>
                  <FaCopy />
                </Button>
              </div>
            </div>

            <div className="mb-4">
              <h5>Your Referral Link</h5>
              <div className="d-flex align-items-center">
                <span className="bg-light p-2 rounded me-2 flex-grow-1 text-truncate">{referralData.referralLink}</span>
                <Button variant="outline-primary" onClick={() => copyToClipboard(referralData.referralLink)}>
                  <FaCopy />
                </Button>
              </div>
              {copied && <span className="text-success ms-2">Copied!</span>}
            </div>

            <div>
              <h5>Your Referrals ({referralData.referrals.length})</h5>
              {referralData.referrals.length === 0 ? (
                <p>You haven't referred anyone yet.</p>
              ) : (
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date Joined</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {referralData.referrals.map((referral, index) => (
                      <tr key={index}>
                        <td>{referral.name}</td>
                        <td>{referral.email}</td>
                        <td>{formatDate(referral.dateJoined)}</td>
                        <td>
                          <span className={`badge ${referral.status === 'active' ? 'bg-success' : 'bg-warning'}`}>
                            {referral.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              )}
            </div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer className='bg-success'>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReferralModal;