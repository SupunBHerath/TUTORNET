const router = require('express').Router();
const controller = require('../controller/teacherController');
const { authMiddleware } = require('../middleware/aulth');


router.post('/register', controller.register);
router.get('/all', controller.all);
router.get('/',authMiddleware , controller.validated)
router.get('/:id', controller.teacher);
router.put('/up-bio/:id', controller.updateTeacherProfile);


module.exports = router;