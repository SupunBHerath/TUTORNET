const express = require('express');
const Student = require('../modules/student');
const router = express.Router();
const controller = require('../controller/studentController');
const { checkEmail } = require('../middleware/checkEmail');



router.post('/register', checkEmail,controller.register);
router.get('/all', controller.all);
router.get('/:id', controller.findId);
router.put('/:id', controller.update);
router.delete('/:id', controller.Delete);



module.exports = router;