const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Get money transactions
router.get('/money', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [transactions] = await pool.execute(
      'SELECT id, type, amount, status, created_at as createdAt FROM money_transactions WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    
    res.json({
      success: true,
      transactions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get bet transactions
router.get('/bets', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [transactions] = await pool.execute(
      'SELECT b.id, g.name as gameName, b.bet_amount as betAmount, b.result, b.winnings, b.created_at as createdAt FROM bets b JOIN games g ON b.game_id = g.id WHERE b.user_id = ? ORDER BY b.created_at DESC',
      [userId]
    );
    
    res.json({
      success: true,
      transactions
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Deposit funds
router.post('/deposit', requireAuth, async (req, res) => {
  try {
    const { amount, paymentMethod } = req.body;
    const userId = req.user.id;
    
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Add money transaction
      await connection.execute(
        'INSERT INTO money_transactions (user_id, type, amount, payment_method, status) VALUES (?, ?, ?, ?, ?)',
        [userId, 'deposit', amount, paymentMethod, 'completed']
      );
      
      // Update user wallet balance
      await connection.execute(
        'UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?',
        [amount, userId]
      );
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Deposit successful'
      });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Withdraw funds
router.post('/withdraw', requireAuth, async (req, res) => {
  try {
    const { amount, paymentDetails } = req.body;
    const userId = req.user.id;
    
    // Check if user has enough balance
    const [users] = await pool.execute(
      'SELECT wallet_balance FROM users WHERE id = ?',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const walletBalance = users[0].wallet_balance;
    
    if (walletBalance < amount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }
    
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Add money transaction
      await connection.execute(
        'INSERT INTO money_transactions (user_id, type, amount, payment_details, status) VALUES (?, ?, ?, ?, ?)',
        [userId, 'withdrawal', amount, paymentDetails, 'pending']
      );
      
      // Update user wallet balance
      await connection.execute(
        'UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?',
        [amount, userId]
      );
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Withdrawal request submitted successfully'
      });
    } catch (err) {
      await connection.rollback();
      throw err;
    } finally {
      connection.release();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;