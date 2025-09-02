const express = require('express');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Get referral data
router.get('/', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Get user's referral code and link
    const [users] = await pool.execute(
      'SELECT referral_code FROM users WHERE id = ?',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const referralCode = users[0].referral_code;
    const referralLink = `http://localhost:3000/register?ref=${referralCode}`;
    
    // Get user's referrals
    const [referrals] = await pool.execute(
      'SELECT id, name, email, created_at as dateJoined, CASE WHEN email_verified = 1 THEN "active" ELSE "pending" END as status FROM users WHERE referred_by = ?',
      [referralCode]
    );
    
    res.json({
      success: true,
      referralCode,
      referralLink,
      referrals
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;