const express = require('express');
const Student = require('../modules/student');
const router = express.Router();
const controller = require('../controller/studentController');



router.post('/register', controller.register);

//register student 
// router.post('/add', (req, res) => {
//     let newStudent = new Student(req.body);
//     newStudent.save()
//         .then(student => { res.status(200).json(student); })
//         .catch(err => {
//             res.status(400).json({ message: err.message })
//             console.log("error", err)
//         })

// })

//get student 

// router.get('/getAllStudent', (req, res) => {
//     Student.find()
//         .then(student => {
//             res.status(200).json(student)
//         }).catch(err => {
//             res.status(400).json({ message: err.message })
//             console.log("error", err)
//         })

// })

//update student 

// router.route('/updateStudent/:id').put((req, res) => {
//     Student.findByIdAndUpdate(
//         req.params.id,
//         { $set: req.body },
//         { new: true } 
//     )
//     .then(student => {
//         if (!student) {return res.status(404).json({ error: "Student not found" }); }
//         return res.status(200).json({ success: "Updated student", student });
//     })
//     .catch(err => {
//         console.error("Error updating student:", err);
//         return res.status(400).json({ error: "Failed to update student" });
//     });
// });


// delete student 

router.delete('/delee/:id', (res, req) => {
    Student.findByIdAndRemove(req.params.id).exex((err, student) => {
        if (err) {
            return res.status(400).json(
                { message: err.message }
            )
        }
        return res.status(200).json({
            message: "Delete successfully",
            data: student
        })
    })
})
module.exports = router;