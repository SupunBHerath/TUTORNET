const router = require('express').Router();
const controller = require('../controller/teacherController');
const controller2 = require('../controller/resultUploadController');
const controller3 = require('../controller/timeTableController');
const { authMiddleware } = require('../middleware/aulth');
const { checkEmail } = require('../middleware/checkEmail');


router.post('/register',checkEmail, controller.register);
router.get('/all', controller.all);
router.get('/',authMiddleware , controller.validated)
router.get('/:id', controller.teacher);
router.post('/result', controller2.uploadResult);
router.delete('/result/:teacherId/:resultId', controller.Delete);
router.delete('/result/:teacherId', controller.DeleteAllresult);
router.put('/up-bio/:id', controller.updateTeacherProfile);



router.post('/timeTable/:teacherId', controller3.createTimeTable);
router.get('/timeTable/:teacherId', controller3.getTimeTable);
router.put('/timeTable/:teacherId/:timeTableId', controller3.updateTimeTable);
router.delete('/timeTable/:teacherId/:timeTableId', controller3.deleteTimeTable);



module.exports = router;