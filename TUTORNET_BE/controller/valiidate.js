const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports.validated = async (req, res) => {
    try {
        const user = req.user;  // Access the user data from req.user
        res.status(200).json(user);  // Send the user data in the response
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
