const Teacher = require('../modules/teacher.js');
const Student = require('../modules/student.js');
const Admin = require('../modules/admin.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Ensure .env file is loaded
dotenv.config();

module.exports.verifyUser = async (req, res, next) => {
    try {
        const { email } = req.method === "GET" ? req.query : req.body;

        // Check the user existence in Teacher, Student, and Admin collections
        const teacherExist = await Teacher.findOne({ email });
        const studentExist = await Student.findOne({ email });
        const adminExist = await Admin.findOne({ email });

        if (!teacherExist && !studentExist && !adminExist) {
            return res.status(404).send({ error: "Can't find User!" });
        }

        next(); // Proceed to the next middleware if user exists

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Authentication Error" }); // Handle other errors with a 500 status code
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
        let user;
        let userType;
        user = await Teacher.findOne({ email });
        userType = 'teacher';
        if (!user) {
            user = await Student.findOne({ email });
            userType = 'student';
        }
        if (!user) {
            user = await Admin.findOne({ email });
            userType = 'admin';
        }

        if (!user) {
            return res.status(404).send({ error: "User not found." });
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ error: "Incorrect password." });
        }

        // Create JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.email,
            userType
        }, process.env.JWT_SECRET || 'ssgdmmsjmjfjsmgfh,jsfv,', { expiresIn: "5min" });

        // Set the JWT as a cookie
        res.cookie('token', token, {
            httpOnly: true, // Helps prevent XSS attacks
            secure: process.env.NODE_ENV === 'production', // Send the cookie only over HTTPS in production
            sameSite: 'Strict', // Helps mitigate CSRF attacks
            maxAge: 5 * 60 * 1000 // 5min hours in milliseconds
        });

        // Send success response with token and username
        return res.status(200).send({
            ok: "Login successful.",
            username: user.name || user.email, // If name doesn't exist, fall back to email
            role: user.role || userType, // Use user.role if available, otherwise use userType
            id: user._id,
            token
        });
    } catch (error) {
        // Handle specific errors
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};

