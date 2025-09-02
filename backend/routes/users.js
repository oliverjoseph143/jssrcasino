const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const pool = require('../config/db');
const { requireAuth } = require('../middleware/auth');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/images/profiles'));
  },
  filename: function (req, file, cb) {
    cb(null, 'profile-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 1000000 }, // 1MB limit
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  }
});

function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Error: Images Only!');
  }
}

// Update user profile
router.put('/update', requireAuth, upload.single('profileImage'), async (req, res) => {
  try {
    const { name, email, mobile, dob } = req.body;
    const userId = req.user.id;
    let profileImage = null;
    
    if (req.file) {
      profileImage = `/images/profiles/${req.file.filename}`;
    }
    
    // Update user in database
    let query = 'UPDATE users SET name = ?, email = ?, mobile = ?, dob = ?';
    let params = [name, email, mobile, dob];
    
    if (profileImage) {
      query += ', profile_image = ?';
      params.push(profileImage);
    }
    
    query += ' WHERE id = ?';
    params.push(userId);
    
    await pool.execute(query, params);
    
    // Get updated user data
    const [users] = await pool.execute(
      'SELECT id, name, email, mobile, dob, profile_image as profileImage, email_verified as emailVerified, mobile_verified as mobileVerified FROM users WHERE id = ?',
      [userId]
    );
    
    const user = users[0];
    
    res.json({
      success: true,
      profileImage: user.profileImage
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const [users] = await pool.execute(
      'SELECT id, name, email, mobile, dob, profile_image as profileImage, email_verified as emailVerified, mobile_verified as mobileVerified, wallet_balance as walletBalance FROM users WHERE id = ?',
      [userId]
    );
    
    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    const user = users[0];
    
    res.json({
      success: true,
      user
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});
// Express.js example
router.get('/wallet', async (req, res) => {
  try {
    console.log("wallet");
    const userId = req.params.id;
    const user = await User.findById(userId).select('wallet_balance');
    res.json({ wallet_balance: user.wallet_balance });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch wallet balance my' });
  }
});
module.exports = router;