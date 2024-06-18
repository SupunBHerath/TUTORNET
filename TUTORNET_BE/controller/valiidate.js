const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

module.exports.validated = async (req, res) => {
    try {
        const user = req.user;  
        res.status(200).json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
