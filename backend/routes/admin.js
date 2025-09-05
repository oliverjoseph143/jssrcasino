const express = require('express');
const router = express.Router();
const { auth } = require('../middleware/auth');
const { getAdmin, updateAdmin, changePassword } = require('../controllers/adminController');

// Admin CRUD routes
router.get('/', auth, getAdmin);
router.put('/', auth, updateAdmin);
router.put('/change-password', auth, changePassword);

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    // Note: authenticateAdmin function needs to be implemented
    // const { authenticateAdmin } = require('../controllers/adminController');
    // const result = await authenticateAdmin(email, password);
    
    // Temporary response - implement actual authentication
    res.status(501).json({ 
      success: false, 
      message: 'Admin authentication not implemented yet' 
    });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Admin password reset route
router.post('/forget-password', (req, res) => {
  const { email } = req.body;
  
  if (!email) {
    return res.status(400).json({
      success: false,
      message: 'Email is required'
    });
  }
  
  // In a real application, you would send a password reset email
  res.json({
    success: true,
    message: `Password reset link sent to ${email} (simulated)`
  });
});

// Export router ONLY at the end, ONCE
module.exports = router;
