const express = require('express');
const router = express.Router();
const Admin = require('../modules/student');
const controller = require('../controller/adminController');



router.post('/register', controller.register);


module.exports = router;