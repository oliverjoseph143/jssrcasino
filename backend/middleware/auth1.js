const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded.admin;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

const superAdminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.admin.type !== 'superadmin') {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  });
};

module.exports = { auth, superAdminAuth };