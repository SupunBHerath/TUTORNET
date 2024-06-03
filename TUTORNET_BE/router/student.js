const express = require('express');
const Student = require('../modules/student');
const router = express.Router();
const controller = require('../controller/studentController');
const { checkEmail } = require('../middleware/checkEmail');



router.post('/register', checkEmail,controller.register);
router.get('/all', controller.all);



module.exports = router;