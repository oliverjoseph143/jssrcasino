const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const db = require('../config/db');

router.post('/credit', async (req, res) => {
  try {
    const { partnerKey, timestamp, gameData, user, transactionData } = req.body;

    if (!partnerKey || !timestamp || !gameData || !user || !transactionData) {
      return res.status(400).json({
        status: { code: "INVALID_REQUEST", message: "Missing required fields" }
      });
    }

    const { providerRoundId, gameCode, providerCode, providerTransactionId, description } = gameData;
    const { id: userId, currency } = user;
    const { id: transactionId, referenceId, amount } = transactionData;

    // Check user exists
    const [userRows] = await db.query(
      'SELECT wallet_balance FROM users WHERE id = ?',
      [userId]
    );
    if (userRows.length === 0) {
      return res.status(404).json({
        status: { code: "USER_NOT_FOUND", message: "User not found" }
      });
    }

    const currentBalance = parseFloat(userRows[0].wallet_balance);

    // Insert transaction
    try {
      await db.query(
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
          referenceId,
          amount
        ]
      );
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({
          status: { code: "DUPLICATE_TRANSACTION", message: "Transaction ID already exists" }
        });
      }
      throw error;
    }

    // Update user balance
    const newBalance = currentBalance + parseFloat(amount);
    await db.query(
      'UPDATE users SET wallet_balance = ? WHERE id = ?',
      [newBalance, userId]
    );

    // Response
    return res.json({
      partnerKey,
      timestamp: Date.now().toString(),
      userId,
      balance: parseFloat(newBalance.toFixed(2)),
      status: { code: "SUCCESS", message: "Credit applied successfully" }
    });

  } catch (error) {
    console.error('Credit API Error:', error);
    res.status(500).json({
      status: { code: "INTERNAL_ERROR", message: "An error occurred while processing your request" }
    });
  }
});

module.exports = router;

