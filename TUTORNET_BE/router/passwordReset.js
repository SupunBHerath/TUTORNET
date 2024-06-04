const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Student = require('../models/Student');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

 
// Setup nodemailer transporter this code not working correctly
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Your email
      pass: process.env.EMAIL_PASSWORD // Your email password
    }
  });

// Forgot Password Endpoint

router.post('/forgot-password', async (req, res) => {
   try{ const { email } = req.body;
   console.log('Received forgot password request for email:', email);
    let user = await User.findOne({ email });
    if (!user) {
        user = await Student.findOne({ email });
        if (!user) {
            console.log('No user found with email:', email);
            return res.status(400).json({ message: 'You are not registered.' });
        }
    }
     // Generate a reset token
     const resetToken = jwt.sign({ email }, process.env.SECRET_KEY, { expiresIn: '1h' });

     // Send reset token to user's email
     const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
     const mailOptions = {
         from: process.env.EMAIL,
         to: email,
         subject: 'Password Reset Request',
         text: `Click on the link to reset your password: ${resetLink}`
     };

     await transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
          return res.status(500).json({ message: 'Error sending email.' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Password reset email sent.', email });
        }
      });
    } catch (error) {
        console.error('Error during forgot password:', error);
        console.log('Email sent:', info.response);
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
        res.status(500).json({ message: 'Internal server error' });
      }
    });

// Reset Password Endpoint
router.post('/reset-password', async (req, res) => {
    try {
        const { token, newPassword } = req.body;
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const email = decoded.email;
        
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);
        
        let user = await User.findOneAndUpdate({ email }, { password: hashedPassword });
        if (!user) {
            user = await Student.findOneAndUpdate({ email }, { password: hashedPassword });
        }
        if (!user) {
           
            return res.status(400).json({ message: 'You are not registered.' });
        }
       
        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error during password reset:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
