const Student = require('../modules/student.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment variables if you have a .env file
dotenv.config();

module.exports.register = async (req, res) => {
    try {
        const { username, email, password} = req.body;

        // Check for missing fields
        if (!username || !email || !password ) {
            return res.status(400).send({ error: "All fields are required." });
        }

        // Check for existing email
        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new Student({
            name: username,
            email,
            password: hashedPassword,
            role:'Student'
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