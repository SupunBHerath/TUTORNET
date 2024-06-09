const express = require('express');
const router = express.Router();
const controller = require('../controller/Forgotpassword');


router.post('/',controller.verifyUser,controller.sendOTP );
router.post('/verifyOTP',controller.verifyOTP );
router.post('/resetPassword',controller.updatePassword );



module.exports = router;
