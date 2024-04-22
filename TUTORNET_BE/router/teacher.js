const router = require('express').Router();
const { status } = require('init');
const Teacher = require('../modules/teacher');
let teacher = require("../modules/teacher");

router.route('/add').post((req, res) => {
    const name = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const district = req.body.district;
    const nickname = req.body.nickname;
    const subject = req.body.subject;
    const newTeacher = new Teacher({
        name,
        email,
        password,
        district,
        subject,
        nickname
    });

    newTeacher.save().then(() => {
        res.json({
            message: "Register Sucess",
            status: "200"
        })
    }).catch(err => {
        res.json({
            message: err.message,
            status: "400"
        })
    });


});
router.route('/').get((req, res) => {
    Teacher.find().then(teachers => {
        res.json(teachers);
    }).catch(err => {
        console.log(err);
    });
})
router.route('/update/:id').put(async (req, res) => {
    let userId = req.params.id;
    const { name, gender, age } = req.body;

    const upadateTeacher = {
        name,
        age,
        gender
    }
    const update = await Teacher.findByIdAndUpdate(userId, upadateTeacher);

    res.status(200).sent({ status: "User updated successfully", user: update }).catch(err => {
        console.log(err);
        res.status(500).send({ status: "Internal server error" });
    });

})

router.route('/delete/:id').delete(async (req, res) => {
    let userId = req.params.id;
    await Teacher.findByIdAndDelete(userId).then(() => {
        res.status(200).send({ status: "User deleted successfully" }).catch(err => {
            console.log(err);
            res.status(500).send({ status: "Internal server error" });
        });
    })

})

router.route('/:id').get(async (req, res) => {
    let userId = req.params.id;
    Teacher.findById(userId).then(teacher => {
        res.json(teacher);
        console.log(teacher);
    }).catch(err => {
        console.log(err);
    });
})
module.exports = router;