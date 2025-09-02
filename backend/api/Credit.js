const express = require('express');
const router = express.Router();
const db = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'goodluck_db'
};
router.post('/Credit', async (req, res) => {
    try {
        const { 
            partnerKey, 
            timestamp, 
            gameData, 
            user, 
            transactionData 
        } = req.body;
        
        const { 
            providerRoundId, 
            gameCode, 
            providerCode, 
            providerTransactionId, 
            description 
        } = gameData;
        
        const { id: userId, currency } = user;
        const { id: transactionId, referenceId, amount } = transactionData;

    
        if (!partnerKey || !timestamp || !gameData || !user || !transactionData) {
            return res.status(400).json({
                status: {
                    code: "INVALID_REQUEST",
                    message: "Missing required fields"
                }
            });
        }

        const [userRows] = await db.query(
            'SELECT wallet_balance FROM users WHERE user_id = ?',
            [userId]
        );

        if (userRows.length === 0) {
            return res.status(404).json({
                status: {
                    code: "USER_NOT_FOUND",
                    message: "User not found"
                }
            });
        }

        const currentBalance = parseFloat(userRows[0].wallet_balance);

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
            // Handle duplicate transaction ID
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({
                    status: {
                        code: "DUPLICATE_TRANSACTION",
                        message: "Transaction ID already exists"
                    }
                });
            }
            throw error;
        }

        // Prepare response
        const response = {
            partnerKey,
            timestamp: Date.now().toString(),
            userId,
            balance: parseFloat(currentBalance.toFixed(2)),
            status: {
                code: "SUCCESS",
                message: ""
            }
        };

        res.json(response);

    } catch (error) {
        console.error('Credit API Error:', error);
        res.status(500).json({
            status: {
                code: "INTERNAL_ERROR",
                message: "An error occurred while processing your request"
            }
        });
    }
});

module.exports = router;