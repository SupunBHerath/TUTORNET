const bcrypt = require('bcrypt');
const Admin = require('../modules/admin.js'); // Import the Admin model

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ error: "All fields are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).send({ error: "Invalid email format." });
        }

        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Admin({
            name: username,
            email,
            password: hashedPassword,
            role: 'Admin'
        });

        await user.save();

        return res.status(200).send({ msg: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error." });
    }
};
module.exports.all = async (req, res) => {
    Admin.find()
        .then(admin => {
            res.status(200).json(admin)
        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}