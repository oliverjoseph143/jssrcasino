require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const betRoutes = require('./routes/bets');
const bodyParser = require('body-parser');
const casinoGameBalance = require('./api/casinoGameBalance');
const creditRoutes = require('./api/credit');
const debitRoute = require('./api/debitRoute');
const app = express();

const { pool } = require('./config/db');

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


// Static files
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bets', betRoutes);
app.use('/api/casino/game', casinoGameBalance);
app.use('/api/casino/game', creditRoutes);
app.use('/api/casino/game', debitRoute);
//app.use('/api/auth', authRoutes);
//app.use('/api/admin', adminRoutes);
//app.use('/api/tickets', ticketRoutes);

/*
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-email-password'
  }
});

// Admin login route
app.post('/api/admin/login', (req, res) => {
  const { email, password } = req.body;
  console.log("call");
  const query = 'SELECT * FROM admin WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Email not found' });
    }
    
    const admin = results[0];
    
    if (admin.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password' });
    }
    
    res.json({
      success: true,
      admin: {
        email: admin.email,
        admin_type: admin.admin_type,
        mobile: admin.mobile,
        photo: admin.photo,
        name: admin.name
      }
    });
  });
});

// Forgot password route
app.post('/api/admin/forgot-password', (req, res) => {
  const { email } = req.body;
  
  const query = 'SELECT * FROM admin WHERE email = ?';
  pool.query(query, [email], (err, results) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    if (results.length === 0) {
      return res.status(404).json({ success: false, message: 'Email not found' });
    }
    
    const admin = results[0];
    
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: email,
      subject: 'Your GOODLUCK Casino Password',
      text: `Your password is: ${admin.password}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Failed to send email' });
      }
      
      res.json({ success: true, message: 'Password sent to your email' });
    });
  });
});

*/



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));