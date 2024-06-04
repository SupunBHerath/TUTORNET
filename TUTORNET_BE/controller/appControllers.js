const Teacher = require('../modules/teacher.js');
const Student = require('../modules/student.js');
const Admin = require('../modules/admin.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports.verifyUser = async (req, res, next) => {
    try {
        const { email } =  req.body;
        console.log(email);
        
        const teacherExist = await Teacher.findOne({ email });
        const studentExist = await Student.findOne({ email });
        const adminExist = await Admin.findOne({ email });

        if (!teacherExist && !studentExist && !adminExist) {
            return res.status(404).send({ error: "Can't find User!" });
        }

        next(); 

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Authentication Error" }); 
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    try {
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

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ error: "Incorrect password." });
        }

        const token = jwt.sign(
            { 
                userId: user._id,
                username: user.name,
                email: user.email,
                role: user.role || userType,
                profile : user.profilePicture || ""
            },
            process.env.JWT_SECRET, 
            { expiresIn: '12h' } 
        );

        return res.status(200).send({
            ok: "Login successful.",
            username: user.name || user.email,
            role: user.role || userType,
            id: user._id,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};


module.exports.Delete = async (req, res) => {
    const { email } = req.body;

    try {
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

      

        await user.deleteOne();

        return res.status(200).send({message: "Delete successful."});
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};