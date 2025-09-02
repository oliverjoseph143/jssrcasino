import React, { useState, useEffect } from 'react';
import { Modal, Button, Table } from 'react-bootstrap';
import axios from 'axios';

const TransactionModal = ({ show, onHide, type }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (show) {
      fetchTransactions();
    }
  }, [show, type]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const endpoint = type === 'money' 
        ? 'http://localhost:5000/api/transactions/money' 
        : 'http://localhost:5000/api/transactions/bets';
      
      const response = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTransactions(response.data.transactions);
      }
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const renderTransactions = () => {
    if (loading) {
      return <p>Loading transactions...</p>;
    }

    if (transactions.length === 0) {
      return <p>No transactions found.</p>;
    }

    return (
      <Table className='table table-dark' bordered hover responsive >
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            {type === 'money' ? (
              <>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
              </>
            ) : (
              <>
                <th>Game</th>
                <th>Bet Amount</th>
                <th>Result</th>
                <th>Winnings</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{formatDate(transaction.createdAt)}</td>
              {type === 'money' ? (
                <>
                  <td>{transaction.type}</td>
                  <td className={transaction.type === 'deposit' ? 'text-success' : 'text-danger'}>
                    {transaction.type === 'deposit' ? '+' : '-'}${transaction.amount}
                  </td>
                  <td>
                    <span className={`badge ${transaction.status === 'completed' ? 'bg-success' : transaction.status === 'pending' ? 'bg-warning' : 'bg-danger'}`}>
                      {transaction.status}
                    </span>
                  </td>
                </>
              ) : (
                <>
                  <td>{transaction.gameName}</td>
                  <td>${transaction.betAmount}</td>
                  <td>
                    <span className={`badge ${transaction.result === 'win' ? 'bg-success' : 'bg-danger'}`}>
                      {transaction.result}
                    </span>
                  </td>
                  <td className={transaction.result === 'win' ? 'text-success' : ''}>
                    {transaction.result === 'win' ? `$${transaction.winnings}` : '-'}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    );
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {type === 'money' ? 'Money Transactions' : 'Bet Transactions'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='text-light bg-dark'>
        {renderTransactions()}
      </Modal.Body>
      <Modal.Footer className='bg-success'>
        <Button variant="dark" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TransactionModal;