const bcrypt = require('bcrypt');
const crypto = require('crypto'); 
const Admin = require('../modules/admin'); 
const transporter = require('../config/notmail');



module.exports.register = async (req, res) => {
    try {
        const { username, email } = req.body;

        if (!username || !email) {
            return res.status(400).json({ error: "All fields are required." });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email format." });
        }

        const existingUser = await Admin.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Please use a unique email." });
        }

        const randomPassword = crypto.randomBytes(6).toString('hex'); 

        const hashedPassword = await bcrypt.hash(randomPassword, 10);

        const user = new Admin({
            name: username,
            email,
            password: hashedPassword,
            role: 'Admin'
        });

        await user.save();

        const mailOptions = {
            from: process.env.MY_GMAIL,
            to: process.env.MY_GMAIL,
            subject: 'Admin Account Created',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
                    <h1 style="color: #007bff;">Admin Account Created</h1>
                    <p>Dear ${username},</p>
                    <p>Your admin account has been created successfully.</p>
                    <p>Your temporary password is:</p>
                    <h2 style="background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;">${randomPassword}</h2>
                    <p>Please change your password after logging in.</p>
                    <p>Thank you,</p>
                    <p>The Admin Team</p>
                </div>
            `
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Error sending email.', msg: 'User registered successfully. Email failed to send.' });
            }
            console.log('Email sent:', info.response);
            return res.status(200).json({ msg: "User registered successfully. Email sent with password.", password: randomPassword });
        });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).json({ error: "Internal server error." });
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