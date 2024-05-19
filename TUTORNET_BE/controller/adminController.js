const bcrypt = require('bcrypt');
const Admin = require('../modules/admin.js'); // Import the Admin model

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check for missing fields
        if (!username || !email || !password) {
            return res.status(400).send({ error: "All fields are required." });
        }

        // Check for valid email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: "Invalid email format." });
        }

        // Check for existing email
        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const user = new Admin({
            name: username,
            email,
            password: hashedPassword,
            role: 'Admin'
        });

        // Save the user to the database
        await user.save();

        // Send success response
        return res.status(200).send({ msg: "User registered successfully." });
    } catch (error) {
        // Log the error to a file or a logging service
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error." });
    }
};
