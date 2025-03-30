const prisma = require('../models');
const config = require('../config/env');
const nodemailer = require("nodemailer");
const bcrypt = require('bcrypt');
const { generateJwtToken } = require('./jwt');


/**
 * Generates a random OTP (One-Time Password).
 * @returns {string} The generated OTP.
 */
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Generates a random six-digit OTP (One-Time Password).
 * @returns {string} The generated OTP.
 */
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Sends an OTP (One-Time Password) email to the specified email address.
 * @param {string} email - The recipient's email address.
 * @param {string} otp - The one-time password to be sent.
 * @returns {Promise<void>} - A promise that resolves when the email is sent successfully.
 */
const sendOTPEmail = async (firstName, lastName, email, otp) => {
  // Configure your email transporter (replace `user` and `pass` with your
  // own SMTP details)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.EMAIL_USER,
      pass: config.EMAIL_PASS
    }
  })

  await transporter.sendMail({
    from: config.EMAIL_USER,
    to: email,
    subject: 'OTP for PPM ERP Registration',
    html: `<p>Hi ${firstName} ${lastName},</p><br><p>Your OTP is: <b>${otp}</b>.
           This OTP will expire in 10 minutes.</p>`
  })
}

/**
 * Handles user email signup.
 * 1. Verifies the email address
 *   a. IF email is already present in User DB, User is already registered
 *   b. If email is not in User DB, but present in verifyOtp DB, email is already verified.
 *   d. If the email is not present in User DB and verifyOtp DB, proceed to next step
 *     i. If the email is not valid, return error
 * 2. Generates OTP.
 * 3. Stores OTP in the database.
 * 4. Sends OTP via email.
 * 5. Returns success message.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the signup process is completed.
 */
const handleUserEmailVerification = async (req, res) => {
  try {
    const { email } = req.body;

    // Check if email already exists in User DB
    const existingUser = await prisma.User.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use. Please proceed to the login page." });
    }

    // Check if email already exists in verifyOtp DB
    const existingOtp = await prisma.verifyOtp.findUnique({ where: { email } });

    if (existingOtp && existingOtp.isVerified) {
      return res.status(400).json({ error: "Email is already verified. Directly enter the password to register" });
    }

    // Validate email
    const isValid = isValidEmail(email);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Generate OTP
    const otp = generateOTP();

    // Store OTP in database
    await prisma.verifyOtp.create({
      data: {
        email,
        otp,
        isVerified: false,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
      },
    });

    // Send OTP via email
    await sendOTPEmail(email, otp);

    // Return success response code 201 - Resource Created
    res.status(200).json({ message: `OTP has been sent to ${email}` });
  } catch (error) {
    // Error code 500 - Server side error
    res.status(500).json({
      error: "Registration process failed",
      details: error.message,
    });
  }
};

/**
 * Handles the verification of email OTP.
 * 1. Finds the OTP record for the given email.
 * If OTP is invalid or expired, return error
 * If OTP is not found, return error
 * If OTP is valid and not expired:
 *   1. return Success message
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the OTP verification is complete.
 */
const handleEmailOtpVerification = async (req, res) => {
  try {
    const { email, otp } = req.body;
    // Find OTP record for this email
    const otpRecord = await prisma.verifyOtp.findUnique({
      where: {
        email
      }
    });

    // Check if OTP record exists
    if (!otpRecord) {
      return res.status(404).json({
        error: `No OTP record found with the registered email: ${email}`,
      });
    }

    // Check if OTP has expired
    if (otpRecord.expiresAt < new Date()) {
      return res.status(401).json({
        error: "OTP has been expired. Please request for a new OTP.",
      });
    }

    // Check if OTP matches
    if (otpRecord.otp !== otp) {
      return res.status(400).json({
        error: "Invalid OTP provided. Bad request, please try again.",
      });
    }

    // Add boolean field in verifyOtp table to check if the OTP is verified or not
    await prisma.verifyOtp.update({
      where: {
        email
      },
      data: {
        isVerified: true
      }
    });
    return res.status(200).json({ message: "OTP verified successfully" });

  } catch (error) {
    // Error code 500 - Server side error
    res.status(500).json({
      error: "OTP verification failed",
      details: error.message
    });
  }
}

/**
 * Handle the resend OTP request using Email ID.
 *
 * @param {Object} req - The request object - firstName, lastName, email.
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the function is done handling the request.
 */
const handleResendOtp = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;

    // Check if the email exists
    const otpRecord = await prisma.verifyOtp.findUnique({
      where: { email }
    });

    if (!otpRecord) {
      return res.status(404).json({ error: `No OTP is registered for this email: ${email}` });
    }

    // Generate new OTP
    const newOtp = generateOTP();

    // Update existing OTP record - single atomic update operation
    await prisma.verifyOtp.update({
      where: { email },
      data: {
        otp: newOtp,
        isVerified: false,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000)
      }
    });

    // Send OTP via email
    const emailResult = await sendOTPEmail(firstName, lastName, email, newOtp);

    if (!emailResult.success) {
      return res.status(500).json({
        error: "Failed to send OTP email",
        details: emailResult.error
      });
    }

    res.status(200).json({ message: `New OTP has been sent to ${email}` });
  } catch (error) {
    // Error code 500 - Server side error
    res.status(500).json({
      error: "Failed to resend OTP",
      details: error.message
    });
  }
};

/**
 * Handles user signup.
 * 1. Password and Confirm Password validation done by the Frontend
 * 2. Add new User to the database
 * 3. Hash the password before storing
 * 4. Generate JWT token and return it along with the response
 * @param {Object} req - The request object - firstName, lastName, email, password
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A Promise that resolves when the signup process is complete.
 */
const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the email is verified
    const isEmailVerified = await prisma.verifyOtp.findUnique({
      where: { email },
    });

    if (!isEmailVerified || !isEmailVerified.isVerified) {
      return res.status(400).json({
        error: "Email not verified.",
        message: "Please verify your email before registering.",
      });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserDetails = await prisma.User.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
    });

    // Generate JWT token without the password field
    const { password: _, ...userWithoutPassword } = newUserDetails;
    const token = generateJwtToken(userWithoutPassword);

    // Set the token in a cookie
    res.cookie("uid", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 10 * 1000), // 10 mins
    });

    // Return success response code 201 - Resource Created
    res.status(201).json({
      user: userWithoutPassword,
      token: token,
    });
  } catch (error) {
    // Error code 500 - Server side error
    res.status(500).json({
      error: "User registration failed.",
      message: "Either the email is already taken or the request is invalid.",
    });
  }
};

/**
 * Handles user login.
 * If email is not found, return error.
 * For login we only require email and password.
 * If password is incorrect, return error.
 * If email and password are correct: Return success message
 * @param {Object} req - The request object - email, password
 * @param {Object} res - The response object.
 * @returns {Object} The response object.
 */
const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in Users table
    const user = await prisma.User.findUnique({
      where: { email }
    });

    // If user not found
    if (!user) {
      return res.status(400).json({
        error: "Login failed",
        details: "Invalid email or password"
      });
    }

    // Compare provided password with stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({
        error: "Login failed",
        details: "Invalid email or password"
      });
    }

    // Remove password from the handleUserLogin response
    // Generate JWT token without the password field
    const { password: _, ...userWithoutPassword } = user;

    const token = generateJwtToken(userWithoutPassword);

    // Set the token in a cookie
    res.cookie("uid", token, {
      httpOnly: true,
      secure: true,
      expires: new Date(Date.now() + 60 * 10 * 1000) // 10 mins
    });

    // Return success response code - 200
    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      token: token,
    });

  } catch (error) {
    // Error code 500 - Server side error
    return res.status(500).json({
      error: "Login failed",
      details: error.message
    });
  }
};

/**
 * Handles the password reset for a user.
 * For password reset:
 * 1. Check if the email exists - if not, return error "Email does not exist"
 * 2. If email exists, take the new password and update the password in the database
 * @param {Object} req - The request object - email, newPassword
 * @param {Object} res - The response object.
 * @returns {Promise<void>} - A promise that resolves when the password reset is complete.
 */
const handlePasswordReset = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    // Check if user exists
    const existingUser = await prisma.User.findUnique({
      where: { email }
    });

    // If user not found, return error
    if (!existingUser) {
      return res.status(404).json({
        error: "Email does not exist",
        message: "No user found with the provided email address"
      });
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await prisma.User.update({
      where: { email },
      data: {
        password: hashedNewPassword
      }
    });

    // Send success response code - 204
    res.status(204).json({
      message: "Password reset successful"
    });

  } catch (error) {
    // Error code 500 - Server side error
    return res.status(500).json({
      error: "Password reset failed",
      details: error.message
    });
  }
};

module.exports = {
  generateOTP,
  isValidEmail,
  sendOTPEmail,
  handleUserEmailVerification,
  handleEmailOtpVerification,
  handleResendOtp,
  handleUserSignup,
  handleUserLogin,
  handlePasswordReset,
}