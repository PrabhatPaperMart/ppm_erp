const jwt = require('jsonwebtoken');
const config = require('../config/env');

// Generate a JWT Token
const generateJwtToken = (user) => {
  const payload = {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  };

  return jwt.sign(payload,
                  config.JWT_SECRET,
                  { expiresIn: config.SIGN_KEY_EXPIRY }
                ); // Token expires in 1 hour
}


module.exports = {
  generateJwtToken,
};