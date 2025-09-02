const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Place a bet
router.post('/place', requireAuth, async (req, res) => {
  try {
    const { gameId, betAmount } = req.body;
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
    
    if (walletBalance < betAmount) {
      return res.status(400).json({ success: false, message: 'Insufficient balance' });
    }
    
    // Start transaction
    const connection = await pool.getConnection();
    await connection.beginTransaction();
    
    try {
      // Deduct bet amount from wallet
      await connection.execute(
        'UPDATE users SET wallet_balance = wallet_balance - ? WHERE id = ?',
        [betAmount, userId]
      );
      
      // Create bet record
      await connection.execute(
        'INSERT INTO bets (user_id, game_id, bet_amount) VALUES (?, ?, ?)',
        [userId, gameId, betAmount]
      );
      
      await connection.commit();
      
      res.json({
        success: true,
        message: 'Bet placed successfully'
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

// Get winners
router.get('/winners', requireAuth, async (req, res) => {
  try {
    // In a real app, this would query actual winning bets
    // For now, we'll return sample data
    const winners = [
      {
        playerName: 'John Doe',
        gameName: 'Blackjack',
        date: new Date().toISOString(),
        betAmount: 100,
        winnings: 250
      },
      {
        playerName: 'Jane Smith',
        gameName: 'Roulette',
        date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
        betAmount: 50,
        winnings: 175
      },
      {
        playerName: 'Bob Johnson',
        gameName: 'Poker',
        date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        betAmount: 200,
        winnings: 500
      }
    ];
    
    res.json({
      success: true,
      winners
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;