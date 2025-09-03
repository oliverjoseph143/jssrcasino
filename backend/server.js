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

// Root route handler
app.get('/', (req, res) => {
  res.json({
    message: 'GoodLuck Casino API Server',
    status: 'running',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      auth: '/api/auth',
      users: '/api/users',
      transactions: '/api/transactions',
      bets: '/api/bets',
      casino: '/api/casino/game'
    }
  });
});

// Health check endpoint for Kubernetes
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
