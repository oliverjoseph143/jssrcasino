const express = require('express');
const mysql = require('mysql2/promise');
const router = express.Router();
const dbConfig =  {
DB_HOST:' mysql.mysql.svc.cluster.local',
DB_NAME: 'oliver_luckdb',
DB_USER: 'casinouser',
DB_PASSWORD: 'Clament(890)',
DB_PORT: '3306'
};

router.post('/Balance', async (req, res) => {
  try {
    const sessionId = req.headers.sessionid;
    const { partnerKey, userId, timestamp } = req.body;
    if (!sessionId || !partnerKey || !userId || !timestamp) {
      return res.status(400).json({
        status: {
          code: "MISSING_FIELDS",
          message: "Missing required fields"
        }
      });
    }
    const connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute(
      'SELECT wallet_balance FROM users WHERE user_id = ?',
      [userId]
    );
    await connection.end();
    if (rows.length === 0) {
      return res.status(404).json({
        status: {
          code: "USER_NOT_FOUND",
          message: "User not found"
        }
      });
    }
    const response = {
      partnerKey,
      timestamp: Date.now().toString(), // Current timestamp
      userId,
      balance: parseFloat(rows[0].wallet_balance).toFixed(2),
      status: {
        code: "SUCCESS",
        message: ""
      }
    };
    res.json(response);

  } catch (error) {
    console.error('Error in casino game balance endpoint:', error);
    res.status(500).json({
      status: {
        code: "INTERNAL_ERROR",
        message: "Internal server error"
      }
    });
  }
});
module.exports = router;