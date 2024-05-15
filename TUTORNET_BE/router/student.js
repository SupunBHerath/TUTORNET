const express = require('express');
const Student = require('../modules/student');
const router = express.Router();
const controller = require('../controller/studentController');



router.post('/register', controller.register);



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