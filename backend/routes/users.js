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

    // Update user in database - FIXED: uses WHERE id = ?
    let query = 'UPDATE users SET name = ?, email = ?, mobile = ?, dob = ?';
    let params = [name, email, mobile, dob];
    
    if (profileImage) {
      query += ', profile_image = ?';
      params.push(profileImage);
    }
    
    query += ' WHERE id = ?';
    params.push(userId);

    await pool.execute(query, params);

    // Get updated user data - FIXED: uses WHERE id = ?
    const [users] = await pool.execute(
      'SELECT id, name, email, mobile, dob, profile_image as profileImage, email_verified as emailVerified, mobile_verified as mobileVerified FROM users WHERE id = ?',
      [userId]
    );

    const user = users[0];
    
    res.json({
      success: true,
      message: 'Profile updated successfully',
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        dob: user.dob,
        profileImage: user.profileImage,
        emailVerified: user.emailVerified,
        mobileVerified: user.mobileVerified
      }
    });
  } catch (err) {
    console.error('Update profile error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user profile
router.get('/profile', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // FIXED: uses WHERE id = ?
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
    console.error('Get profile error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user wallet balance - FIXED: uses MySQL and proper authentication
router.get('/wallet', requireAuth, async (req, res) => {
  try {
    const userId = req.user.id;
    
    // FIXED: uses MySQL instead of Mongoose, and WHERE id = ?
    const [users] = await pool.execute(
      'SELECT wallet_balance FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    res.json({
      success: true,
      wallet_balance: parseFloat(users[0].wallet_balance),
      message: 'Wallet balance retrieved successfully'
    });
  } catch (error) {
    console.error('Wallet balance error:', error.message);
    res.status(500).json({ 
      success: false,
      message: 'Failed to fetch wallet balance' 
    });
  }
});

// Update user password (bonus endpoint)
router.put('/change-password', requireAuth, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    // Get current user password - FIXED: uses WHERE id = ?
    const [users] = await pool.execute(
      'SELECT password FROM users WHERE id = ?',
      [userId]
    );

    if (users.length === 0) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const user = users[0];

    // Verify current password
    const bcrypt = require('bcryptjs');
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password - FIXED: uses WHERE id = ?
    await pool.execute(
      'UPDATE users SET password = ? WHERE id = ?',
      [hashedPassword, userId]
    );

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (err) {
    console.error('Change password error:', err.message);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
