const prisma = require('../models');
const config = require('../config/env');
const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from cookie or authorization header
    let token = req.cookies.uid;
    
    // If no token in cookie, check authorization header
    if (!token && req.headers.authorization) {
      // Normally it has "Bearer <token>"
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, config.JWT_SECRET);
    
    // Get user from database using email (since id is not in the token)
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        // Add any other fields you need
      }
    });
    
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = {
  authMiddleware,
};