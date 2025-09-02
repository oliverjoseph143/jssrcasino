const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'goodluck_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log("******************************");
    console.log('Connected to MySQL database');
     console.log("******************************");
    console.log('initial to cyber security batch');
     console.log("******************************");
    connection.release();
  })
  .catch(error => {
    console.error('Database connection failed:', error.stack);
  });

module.exports = pool;