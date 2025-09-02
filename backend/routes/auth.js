const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');



// Login
router.post('/login', async (req, res) => {
  try {
   
    const { email, password } = req.body;
    
    // Check if user exists
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
    
    if (users.length === 0) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    const user = users[0];
    
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
    
    // Create JWT
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '1d'},
      (err, token) => {
        if (err) throw err;
        res.json({
          success: true,
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            profileImage: user.profile_image,
            emailVerified: user.email_verified,
            mobileVerified: user.mobile_verified,
            wallet_balance:user.wallet_balance,
            dob: user.dob
          }
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, mobile, dob, password } = req.body;
    console.log("called");
    // Check if user already exists
    const [users] = await pool.execute(
      'SELECT * FROM users WHERE email = ? OR mobile = ?',
      [email, mobile]
    );
    
    if (users.length > 0) {
      return res.status(400).json({ 
        success: false, 
        message: 'User with this email or mobile already exists' 
      });
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Generate referral code
    const referralCode = 'GL' + Math.random().toString(36).substring(2, 8).toUpperCase();
    
    // Insert user into database
    const [result] = await pool.execute(
      'INSERT INTO users (name, email, mobile, dob, password, referral_code) VALUES (?, ?, ?, ?, ?, ?)',
      [name, email, mobile, dob, hashedPassword, referralCode]
    );
    
    res.status(201).json({
      success: true,
      message: 'User registered successfully'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Send Email OTP
router.post('/send-email-otp', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes
    
    // Save OTP to database
    await pool.execute(
      'INSERT INTO email_otps (user_id, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?',
      [userId, otp, otpExpiry, otp, otpExpiry]
    );
    
    // In a real app, you would send the OTP via email
    console.log(`Email OTP for user ${userId}: ${otp}`);
    
    res.json({
      success: true,
      message: 'OTP sent to your email'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Send Mobile OTP
router.post('/send-mobile-otp', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    const otpExpiry = new Date(Date.now() + 10 * 60000); // 10 minutes
    
    // Save OTP to database
    await pool.execute(
      'INSERT INTO mobile_otps (user_id, otp, expires_at) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE otp = ?, expires_at = ?',
      [userId, otp, otpExpiry, otp, otpExpiry]
    );
    
    // In a real app, you would send the OTP via SMS
    console.log(`Mobile OTP for user ${userId}: ${otp}`);
    
    res.json({
      success: true,
      message: 'OTP sent to your mobile'
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Google OAuth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const payload = {
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/success?token=${token}`);
      }
    );
  }
);

// Facebook OAuth
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

router.get('/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication
    const payload = {
      user: {
        id: req.user.id,
        email: req.user.email,
        name: req.user.name
      }
    };
    
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        
        // Redirect to frontend with token
        res.redirect(`http://localhost:3000/auth/success?token=${token}`);
      }
    );
  }
);

module.exports = router;