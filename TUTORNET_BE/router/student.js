const express = require('express');
const Student = require('../modules/student');
const router = express.Router();
const controller = require('../controller/studentController');



router.post('/register', controller.register);



module.exports = router;