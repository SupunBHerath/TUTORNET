const express = require('express');
const router = express.Router();
const Admin = require('../modules/student');
const controller = require('../controller/adminController');
const { authMiddleware } = require('../middleware/aulth');



router.post('/register',authMiddleware , controller.register );
router.post('/', authMiddleware);


module.exports = router;