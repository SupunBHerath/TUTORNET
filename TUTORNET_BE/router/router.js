const express = require('express');
const router = express.Router();
const controller = require('../controller/appControllers.js');
const { authMiddleware } = require('../middleware/aulth.js');

router.post('/authenticate',authMiddleware, controller.verifyUser, (req, res) => res.end()); 
router.post('/login', controller.verifyUser, controller.login); 
router.delete('/delete', controller.Delete); 



module.exports = router;
