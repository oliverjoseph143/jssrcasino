const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const db = require('../config/db');

router.post('/debit', async (req, res) => {
  let connection;
  
  try {
    // Create database connection
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    const { 
      partnerKey, 
      user: { id: userId, currency }, 
      gameData: { 
        providerCode, 
        providerTransactionId, 
        gameCode, 
        description, 
        providerRoundId 
      }, 
      transactionData: { 
        id: transactionId, 
        amount, 
        referenceId 
      } 
    } = req.body;

    await connection.beginTransaction();

    // Insert transaction record
    const [transactionResult] = await connection.execute(
      `INSERT INTO transactions (
        transaction_id, user_id, provider_code, provider_transaction_id,
        game_code, description, provider_round_id, reference_id, amount
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        transactionId,
        userId,
        providerCode,
        providerTransactionId,
        gameCode,
        description,
        providerRoundId,
        referenceId || null,
        amount
      ]
    );

    // Update user balance
    await connection.execute(
      `UPDATE users SET wallet_balance = wallet_balance + ? WHERE id = ?`,
      [amount, userId]
    );

    // Get updated balance
    const [userRows] = await connection.execute(
      'SELECT wallet_balance FROM users WHERE id = ?',
      [userId]
    );
    
    const balance = userRows[0]?.wallet_balance || 0;

    await connection.commit();

    const response = {
      partnerKey,
      timestamp: Date.now().toString(),
      userId,
      balance: parseFloat(balance.toFixed(2)),
      status: {
        code: 'SUCCESS',
        message: ''
      }
    };

    res.json(response);
  } catch (error) {
    if (connection) {
      await connection.rollback();
    }
    
    console.error('Debit Error:', error);
    res.status(500).json({
      partnerKey: req.body.partnerKey,
      timestamp: Date.now().toString(),
      userId: req.body.user?.id || null,
      balance: 0,
      status: {
        code: 'ERROR',
        message: error.message
      }
    });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

module.exports = router;
