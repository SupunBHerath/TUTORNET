const express = require('express');
const router = express.Router();
const controller = require('../controller/webFeedbackController');




router.post('/', controller.createFeedback);

module.exports = router;