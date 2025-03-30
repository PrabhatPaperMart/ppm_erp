const express = require('express');
const { handleUserEmailVerification, handleEmailOtpVerification, handleResendOtp, handleUserSignup, handleUserLogin, handlePasswordReset } = require('../controllers/authController');
const router = express.Router();

// All `register` endpoints
router.route('/register/verify/email')
  .post(handleUserEmailVerification);
router.route('/register/verify/emailOtp')
  .post(handleEmailOtpVerification);
router.route('/register/resendOtp')
  .post(handleResendOtp);
router.route('/register')
  .post(handleUserSignup);

// All `login` endpoints
router.route('/login')
  .post(handleUserLogin);
router.route('/login/passwordReset')
  .post(handlePasswordReset);

module.exports = router;