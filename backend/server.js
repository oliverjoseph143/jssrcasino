require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static files
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, '../public/images')));

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

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Database debug endpoint - TEMPORARY
app.get('/debug/tables', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    // Get all tables
    const [tables] = await pool.execute("SHOW TABLES");
    
    // Get transaction-related tables
    const [transactionTables] = await pool.execute("SHOW TABLES LIKE '%transaction%'");
    
    // Get users table structure
    const [userStructure] = await pool.execute("DESCRIBE users");
    
    // Check if specific tables exist
    const [gameTransactions] = await pool.execute("SHOW TABLES LIKE 'game_transactions'");
    const [casinoTransactions] = await pool.execute("SHOW TABLES LIKE 'casino_transactions'");
    const [betsTable] = await pool.execute("SHOW TABLES LIKE 'bets'");
    
    res.json({
      success: true,
      allTables: tables.map(row => Object.values(row)[0]),
      transactionTables: transactionTables.map(row => Object.values(row)[0]),
      usersTableStructure: userStructure,
      specificTables: {
        game_transactions: gameTransactions.length > 0,
        casino_transactions: casinoTransactions.length > 0,
        bets: betsTable.length > 0,
        transactions: tables.some(row => Object.values(row)[0] === 'transactions')
      },
      message: 'Database structure retrieved successfully'
    });
  } catch (error) {
    console.error('Database debug error:', error);
    res.status(500).json({ 
      success: false,
      error: error.message,
      message: 'Failed to retrieve database structure'
    });
  }
});

// Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');
const transactionRoutes = require('./routes/transactions');
const betRoutes = require('./routes/bets');

// Casino APIs
const casinoGameBalance = require('./api/casinoGameBalance');
const creditRoutes = require('./api/credit');
const debitRoutes = require('./api/debitRoute');

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/bets', betRoutes);

// Casino APIs
app.use('/api/casino/game', casinoGameBalance);
app.use('/api/casino/game', creditRoutes);
app.use('/api/casino/game', debitRoutes);

// 404 handler - Fixed to not use wildcard pattern
app.use((req, res, next) => {
  console.log(`404 - Route not found: ${req.method} ${req.originalUrl}`);
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('=== ERROR CAUGHT ===');
  console.error('Time:', new Date().toISOString());
  console.error('URL:', req.method, req.originalUrl);
  console.error('Error:', err);
  console.error('Stack:', err.stack);
  console.error('==================');
  
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  res.status(err.status || 500).json({
    success: false,
    message: isDevelopment ? err.message : 'Internal server error',
    ...(isDevelopment && { 
      error: err.message,
      stack: err.stack,
      details: err
    }),
    timestamp: new Date().toISOString()
  });
});
// Add this endpoint after the existing /debug/tables endpoint
app.post('/debug/create-transactions-table', async (req, res) => {
  try {
    const pool = require('./config/db');
    
    const createTableSQL = `
      CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_id VARCHAR(255) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        provider_code VARCHAR(100),
        provider_transaction_id VARCHAR(255),
        game_code VARCHAR(100),
        description TEXT,
        provider_round_id VARCHAR(255),
        reference_id VARCHAR(255),
        amount DECIMAL(10,2) NOT NULL,
        transaction_type ENUM('credit', 'debit') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_user_id (user_id),
        INDEX idx_transaction_id (transaction_id)
      )
    `;
    
    await pool.execute(createTableSQL);
    
    res.json({ 
      success: true, 
      message: 'Transactions table created successfully' 
    });
  } catch (error) {
    console.error('Create table error:', error);
    res.status(500).json({ 
      success: false, 
      error: error.message
    });
  }
});


// Add this to your server.js file
app.get('/setup-casino-table', async (req, res) => {
  try {
    const pool = require('./config/db');
    await pool.execute(`
      CREATE TABLE transactions (
        id INT AUTO_INCREMENT PRIMARY KEY,
        transaction_id VARCHAR(255) UNIQUE NOT NULL,
        user_id INT NOT NULL,
        provider_code VARCHAR(100),
        provider_transaction_id VARCHAR(255),
        game_code VARCHAR(100),
        description TEXT,
        provider_round_id VARCHAR(255),
        reference_id VARCHAR(255),
        amount DECIMAL(10,2) NOT NULL,
        transaction_type ENUM('credit', 'debit'),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    res.json({ success: true, message: 'Casino transactions table created' });
  } catch (error) {
    res.json({ success: false, error: error.message });
  }
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 API Base URL: http://localhost:${PORT}`);
  console.log(`📊 Health Check: http://localhost:${PORT}/health`);
});

