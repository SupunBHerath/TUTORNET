const express = require('express');
const router = express.Router();
const controller = require('../controller/appControllers.js');
const { authMiddleware } = require('../middleware/aulth.js');

// POST Methods
router.post('/authenticate', controller.verifyUser, (req, res) => res.end()); // authenticate user
router.post('/login', controller.verifyUser, controller.login,authMiddleware); // login in app

// GET Methods


module.exports = router;
