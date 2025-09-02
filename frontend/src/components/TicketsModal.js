import React, { useState, useEffect } from 'react';
import { FaCheck, FaTimes, FaReply } from 'react-icons/fa';
import axios from 'axios';

const TicketsModal = ({ onClose }) => {
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [response, setResponse] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await axios.get('/api/tickets/open');
        setTickets(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTickets();
  }, []);

  const handleRespond = async () => {
    try {
      await axios.post('/api/tickets/respond', {
        ticketId: selectedTicket.id,
        message: response
      });
      // Refresh tickets
      const res = await axios.get('/api/tickets/open');
      setTickets(res.data);
      setSelectedTicket(null);
      setResponse('');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>Open Tickets</h2>
        <table className="table">
          <thead>
            <tr>
              <th>User ID</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Evidence</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map(ticket => (
              <tr key={ticket.id}>
                <td>{ticket.user_id}</td>
                <td>{ticket.subject}</td>
                <td>{ticket.message}</td>
                <td>
                  {ticket.evidence && (
                    <img src={`/images/tickets/${ticket.evidence}`} alt="Evidence" style={{ width: '50px' }} />
                  )}
                </td>
                <td>{new Date(ticket.created_at).toLocaleString()}</td>
                <td>
                  <button className="btn btn-success" onClick={() => setSelectedTicket(ticket)}>
                    <FaCheck />
                  </button>
                  <button className="btn btn-danger" style={{ marginLeft: '5px' }}>
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {selectedTicket && (
          <div className="ticket-response">
            <h3>Respond to Ticket</h3>
            <textarea 
              value={response} 
              onChange={(e) => setResponse(e.target.value)}
              className="form-control"
              rows="4"
              placeholder="Type your response here..."
            />
            <div style={{ marginTop: '10px' }}>
              <button className="btn btn-success" onClick={handleRespond}>
                <FaReply /> Send Response
              </button>
              <button className="btn btn-danger" style={{ marginLeft: '10px' }} onClick={() => setSelectedTicket(null)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketsModal;