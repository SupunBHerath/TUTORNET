const Admin = require("../modules/admin");
const Student = require("../modules/student");
const Teacher = require("../modules/teacher");


module.exports.checkEmail = async (req, res, next) => {
    try {
        const { email } = req.method === "GET" ? req.query : req.body;

        
        const teacherExist = await Teacher.findOne({ email });
        const studentExist = await Student.findOne({ email });
        const adminExist = await Admin.findOne({ email });

        if (!teacherExist && !studentExist && !adminExist) {
            return res.status(200).send({ module: "unique email"});
        }else{
            return res.status(400).send({ error: "Please use a unique email.",
                status:400
             });
        }
        
        next(); 

    } catch (error) {
        console.error(error);
        return res.status(500).send({ error: "Authentication Error" }); 
    }
};