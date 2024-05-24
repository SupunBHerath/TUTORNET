const Teacher = require('../modules/teacher.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment variables if you have a .env file
dotenv.config();

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, district, nickname, subject } = req.body;

        // Check for missing fields
        if (!username || !email || !password || !district || !nickname || !subject) {
            return res.status(400).send({ error: "All fields are required." });
        }

        // Check for existing email
        const existingUser = await Teacher.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new Teacher({
            name: username,
            nickname,
            email,
            password: hashedPassword,
            district,
            subject,
            role:'Teacher'
        });

        // Save the user to the database
        await user.save();

        // Send success response
        return res.status(200).send({ msg: "User registered successfully." });
    } catch (error) {
        // Handle specific errors
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error." });
    }
};
module.exports.all = async (req, res) => {
    Teacher.find()
        .then(teacher => {
            res.status(200).json(teacher)
        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}



module.exports.validated = async (req, res) => {
    try {
        const user = req.user;  // Access the user data from req.user
        res.status(200).json(user);  // Send the user data in the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
