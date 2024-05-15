const Teacher = require('../modules/teacher.js');
const Student = require('../modules/student.js');
const Admin = require('../modules/admin.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
// const otpGenerator = require('otp-generator');

/** middleware for verify user */

module.exports.verifyUser = async (req, res, next) => {
    try {
        const { email } = req.method === "GET" ? req.query : req.body;

        // Check the user existence in both Teacher and Student collections
        let teacherExist = await Teacher.findOne({ email });
        let studentExist = await Student.findOne({ email });
        let adminExist = await Admin.findOne({ email });

        if (!teacherExist && !studentExist && !adminExist) {
            return res.status(404).send({ error: "Can't find User!" });
        }

        next(); // Proceed to the next middleware if user exists

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Authentication Error" }); // Handle other errors with a 500 status code
    }
};




// module.exports.register = async (req, res) => {
//     try {
//         const { name, nickname, email, subject, district } = req.body;

//         // Check for existing email
//         const existingUser = await UserModel.findOne({ email });
//         if (existingUser) {
//             return res.status(400).send({ error: "Please use a unique email." });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         // Create a new user
//         const user = new UserModel({
//             name,
//             nickname,
//             email,
//             password: hashedPassword,
//             district,
//             subject
//         });

//         // Save the user to the database
//         await user.save();

//         // Send success response
//         return res.status(201).send({ msg: "User registered successfully." });
//     } catch (error) {
//         // Handle errors
//         return res.status(500).send({ error: "Internal server error." });
//     }
// };


/** POST: http://localhost:8080/api/login 
 * @param: {
  "username" : "example123",
  "password" : "admin123"
}
*/
module.exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the user by email
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

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(400).send({ error: "Incorrect password." });
        }

        // Create JWT token
        const token = jwt.sign({
            userId: user._id,
            username: user.email,
            userType
        }, process.env.JWT_SECRET || 'ssgdmmsjmjfjsmgfh,jsfv,', { expiresIn: "24h" });

        // Send success response with token and username
        return res.status(200).send({
            ok: "Login successful.",
            username: user.name || user.email, // If name doesn't exist, fall back to email
            role: user.role || userType, // Use user.role if available, otherwise use userType
            id: user._id,
            token
        });
    } catch (error) {
        // Handle specific errors
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};


/** GET: http://localhost:8080/api/user/example@gmail.com */
module.exports.getUser = async (req, res) => {
    const { email } = req.params; // Use req.query for query parameters
    console.log(req.params);
    try {
        if (!email) return res.status(400).send({ error: "Invalid email." });

        const user = await UserModel.findOne({ email }); // Use await to wait for the result
        if (!user) return res.status(404).send({ error: "User not found." });

        return res.status(200).send(user);
    } catch (error) {
        console.error(error); // Log the error for debugging
        return res.status(500).send({ error: "Internal server error." });
    }
};





module.exports.getUserById = async (req, res) => {
    const { id } = req.params; // Assuming the parameter is named 'id' in the URL
    if (!id) return res.status(400).send({ error: "Invalid user ID." });

    try {
        const user = await UserModel.findById(id);
        if (!user) return res.status(404).send({ error: "User not found." });
        return res.status(200).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Internal server error." });
    }
};

/** PUT: http://localhost:8080/api/updateuser 
 * @param: {
  "header" : "<token>"
}
body: {
    firstName: '',
    address : '',
    profile : ''
}
*/
module.exports.updateUser = async (req, res) => {
    try {

        // const id = req.query.id;
        const { userId } = req.user;

        if (userId) {
            const body = req.body;

            // update the data
            UserModel.updateOne({ _id: userId }, body, function (err, data) {
                if (err) throw err;

                return res.status(201).send({ msg: "Record Updated...!" });
            })

        } else {
            return res.status(401).send({ error: "User Not Found...!" });
        }

    } catch (error) {
        return res.status(401).send({ error });
    }
}


/** GET: http://localhost:8080/api/generateOTP */
module.exports.generateOTP = async (req, res) => {

}


/** GET: http://localhost:8080/api/verifyOTP */
module.exports.verifyOTP = async (req, res) => {

}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
module.exports.createResetSession = async (req, res) => {

}


// update the password when we have valid session
/** PUT: http://localhost:8080/api/resetPassword */
module.exports.resetPassword = async (req, res) => {

}