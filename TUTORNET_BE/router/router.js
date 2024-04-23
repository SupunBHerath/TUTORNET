const express = require('express');
const router = express.Router();
const controller = require('../controller/appControllers.js');

// POST Methods
router.post('/register', controller.register); // register user
router.post('/authenticate', controller.verifyUser, (req, res) => res.end()); // authenticate user
router.post('/login', controller.verifyUser, controller.login); // login in app

// GET Methods
router.get('/user/email/:email', controller.getUser); // user with username
router.get('/user/id/:id', controller.getUserById); // user with username
router.get('/generateOTP', controller.verifyUser, controller.generateOTP); // generate random OTP
router.get('/verifyOTP', controller.verifyUser, controller.verifyOTP); // verify generated OTP
router.get('/createResetSession', controller.createResetSession); // reset all the variables

// PUT Methods
router.put('/updateuser', controller.updateUser); // is use to update the user profile
router.put('/resetPassword', controller.verifyUser, controller.resetPassword); // use to reset password

module.exports = router;
