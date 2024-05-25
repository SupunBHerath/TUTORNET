const express = require('express');
const router = express.Router();
const controller = require('../controller/valiidate');
const { authMiddleware } = require('../middleware/aulth');



router.get('/', authMiddleware,controller.validated);
module.exports = router;