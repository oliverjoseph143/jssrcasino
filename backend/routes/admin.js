const express = require('express');
const router = express.Router();
//const { authenticateAdmin } = require('../adminloginauth');
const { auth } = require('../middleware/auth');
const { getAdmin, updateAdmin, changePassword } = require('../controllers/adminController');

router.get('/', auth, getAdmin);
router.put('/', auth, updateAdmin);
router.put('/change-password', auth, changePassword);

module.exports = router;
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await authenticateAdmin(email, password);
    res.json(result);
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/forget-password', (req, res) => {
  const { email } = req.body;
  
  // In a real application, you would send a password reset email
  // For this example, we'll just return a success message
  res.json({ 
    success: true, 
    message: `Password reset link sent to ${email} (simulated)` 
  });
});

module.exports = router;