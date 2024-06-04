const Student = require('../modules/student.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

// Load environment variables if you have a .env file
dotenv.config();

module.exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).send({ error: "All fields are required." });
        }

        const existingUser = await Student.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new Student({
            name: username,
            email,
            password: hashedPassword,
            role: 'Student'
        });

        await user.save();

        return res.status(200).send({ msg: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error." });
    }
};
module.exports.all = async (req, res) => {
    Student.find()

        .then(student => {
            res.status(200).json(student)

        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}

module.exports.findId = async (req, res) => {
    Student.findById(req.params.id)
        .then(student => {
            res.status(200).json(student)

        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}

module.exports.update = async (req, res) => {
    Student.findByIdAndUpdate(req.params.id, req.body, { new: true })
        .then(student => {
            res.status(200).json(student)
        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}
module.exports.Delete = async (req, res) => {
    Student.findByIdAndDelete(req.params.id)
        .then(student => {
            res.status(200).json(student)
        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
}