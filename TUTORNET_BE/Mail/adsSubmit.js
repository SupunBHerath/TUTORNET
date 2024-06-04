// Import required modules
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config(); // Import dotenv for managing environment variables

// Create an Express router
const router = express.Router();

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// POST endpoint to handle form submissions
router.post('/submit', async (req, res) => {
    try {
        const { location, email, payDay, payment } = req.body;

        // Create a Nodemailer transporter
        let transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.MY_GMAIL,
                pass: process.env.MY_PASSWORD,
            }
        });

        // Send mail with defined transport object
        let info = await transporter.sendMail({
            from: `"Your Name" <${process.env.MY_GMAIL}>`, // Use the sender's name and email
            to: 'recipient@example.com', // Replace with the recipient's email address
            subject: 'New Advertisement Submission',
            html: `
                <p>Location: ${location}</p>
                <p>Email: ${email}</p>
                <p>Payment Day: ${payDay}</p>
                <p>Payment: ${payment}</p>
            `
        });

        console.log('Message sent: %s', info.messageId);
        res.status(200).send('Form submitted successfully.');
    } catch (error) {
        console.error('Error submitting form:', error);
        res.status(500).send('Failed to submit form.');
    }
});

module.exports = router;
