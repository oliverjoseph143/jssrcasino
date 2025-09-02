import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const WinnersModal = ({ show, onHide }) => {
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      fetchWinners();
    }
  }, [show]);

  const fetchWinners = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('/api/bets/winners', {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setWinners(response.data.winners);
      }
    } catch (err) {
      console.error('Failed to fetch winners:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Recent Winners</Modal.Title>
      </Modal.Header>
      <Modal.Body className='bg-dark text-light'>
        {loading ? (
          <p>Loading winners...</p>
        ) : winners.length === 0 ? (
          <p>No recent winners found.</p>
        ) : (
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Player</th>
                <th>Game</th>
                <th>Date</th>
                <th>Bet Amount</th>
                <th>Winnings</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner, index) => (
                <tr key={index}>
                  <td>{winner.playerName}</td>
                  <td>{winner.gameName}</td>
                  <td>{formatDate(winner.date)}</td>
                  <td>${winner.betAmount}</td>
                  <td className="text-success">${winner.winnings}</td>
                </tr>
              ))}
            </tbody>
          </Table>
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

export default WinnersModal;