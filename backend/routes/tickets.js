const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const bodyParser = require('body-parser');
const auth = require('../middleware/auth1');
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../frontend/public/images/tickets'));
  },
  filename: function (req, file, cb) {
    cb(null, 'ticket-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images and PDFs Only!');
  }
}

// Create a support ticket
router.post('/create', requireAuth, upload.single('evidence'), async (req, res) => {
  try {
    const { subject, message, email } = req.body;
    const userId = req.user.id;
    let evidence = null;
    
    if (req.file) {
      evidence = `/images/tickets/${req.file.filename}`;
    }
    
    // Insert ticket into database
    await pool.execute(
      'INSERT INTO tickets (user_id, subject, message, email, evidence) VALUES (?, ?, ?, ?, ?)',
      [userId, subject, message, email, evidence]
    );
    
    res.json({
      success: true,
      message: 'Ticket submitted successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
router.get('/status', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT id, subject, message, status, created_at, updated_at 
      FROM tickets 
      WHERE user_id = $1
      ORDER BY created_at DESC
    `, [req.user.id]); // Assuming user ID is available via authentication
    
    res.json(result.rows);
  } catch (error) {
    console.error('Database query error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/open',auth, async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT * FROM tickets WHERE status = "open" ORDER BY created_at DESC'
    );
    
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to fetch tickets' });
  }
});

// Respond to Ticket
router.post('/respond',auth, async (req, res) => {
  try {
    const { ticketId, message } = req.body;
    
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Add response
      await connection.execute(
        'INSERT INTO ticket_responses (ticket_id, user_id, admin_id, message) VALUES (?, ?, ?, ?)',
        [ticketId, req.body.userId, req.user.id, message]
      );
      
      // Update ticket status
      await connection.execute(
        'UPDATE tickets SET status = "close" WHERE id = ?',
        [ticketId]
      );
      
      await connection.commit();
      res.json({ success: true, message: 'Ticket responded successfully' });
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to respond to ticket' });
  }
});

// Reject Ticket
router.post('/reject',auth, async (req, res) => {
  try {
    const { ticketId } = req.body;
    
    await pool.execute(
      'UPDATE tickets SET status = "close" WHERE id = ?',
      [ticketId]
    );
    
    res.json({ success: true, message: 'Ticket rejected successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to reject ticket' });
  }
});

module.exports = router;

