const express = require('express');
const router = express.Router();
const Admin = require('../modules/student');
const controller = require('../controller/adminController');
const { authMiddleware } = require('../middleware/aulth');
const { checkEmail } = require('../middleware/checkEmail');



router.post('/register' ,checkEmail, controller.register );
router.post('/', authMiddleware);
router.get('/all', controller.all);


module.exports = router;