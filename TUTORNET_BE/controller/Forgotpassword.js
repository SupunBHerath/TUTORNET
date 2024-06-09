const nodemailer = require('nodemailer');
const otpGenerator = require('otp-generator');
const OTP = require('../modules/Otp.js');
const Teacher = require('../modules/teacher.js');
const Student = require('../modules/student.js');
const Admin = require('../modules/admin.js');

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD
    }
});
module.exports.verifyUser = async (req, res, next) => {
    try {
        const { email } =  req.body;
        console.log(email);
        
        const teacherExist = await Teacher.findOne({ email });
        const studentExist = await Student.findOne({ email });
        const adminExist = await Admin.findOne({ email });

        if (!teacherExist && !studentExist && !adminExist) {
            return res.status(404).json({ error: "Can't find User!" });
        }

        next(); 

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Authentication Error" }); 
    }
};

// Function to send OTP
module.exports.sendOTP = async (req,res) => {
    const { email, id } = req.body;
    console.log(process.env.MY_GMAIL);
    console.log(id);
    if(!email || !id){
        return res.status(400).json({ error: "All fields are required." });
    }
    try {
        const otp = otpGenerator.generate(5, { upperCase: false, specialChars: false });

        const mailOptions = {
            from: process.env.MY_GMAIL,
            to: process.env.MY_GMAIL,
            subject: 'OTP for Password Reset',
            html: `
                <div style="font-family: Arial, sans-serif; color: #333; background-color: #f5f5f5; padding: 20px;">
                    <h1 style="color: #007bff;">OTP for Password Reset</h1>
                    <p>Dear User,</p>
                    <p>Your OTP for resetting your password on TUTORNET is:</p>
                    <h2 style="background-color: #007bff; color: #fff; padding: 10px; border-radius: 5px;">${otp}</h2>
                    <p>Please use this OTP to reset your password. If you did not request a password reset, please ignore this email.</p>
                    <p>Thank you,</p>
                    <p>The TUTORNET Team</p>
                </div>
            `
        };
        const newOtp = new OTP({
            email: email,
            otp: otp,
            id:id
        })
         await newOtp.save();
          
         transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Error sending OTP' });
            } else {
                console.log('Email sent:', info.response);
                return res.status(200).json({ message: 'OTP sent successfully' });
            }
        });

    } catch (err) {
        console.error('Error sending email:', err);
        throw new Error('Error sending OTP');
    }
};


module.exports.verifyOTP = async (req , res)=>{
    const {Id,otp} = req.body;
    console.log(Id);
    try {
        const otpExist = await OTP.findOne({ id:Id });
        if (!otpExist) {
            return res.status(404).send({ error: "Can't find OTP!" });
        }
        if(otpExist.otp == otp){
            return res.status(200).json({ message: 'OTP verified successfully' });
        }
        else{
            return res.status(404).send({ error: "Can't find OTP!" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server Error' });
    }
}


module.exports.updatePassword = async (req, res) => {
    const { email, newPassword ,Id } = req.body;
    
    try {
        const OTPId = await OTP.findOne({ id:Id });
        if (!OTPId) {
            return res.status(404).send({ error: "Can't find OTP!" });
        }
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

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        user.password = hashedPassword;
        await user.save();

        return res.status(200).send({ message: "Password updated successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};
