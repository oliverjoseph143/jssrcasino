const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getOpenTickets, respondToTicket } = require('../controllers/ticketController');

router.get('/open', auth, getOpenTickets);
router.post('/respond', auth, respondToTicket);

module.exports = router;