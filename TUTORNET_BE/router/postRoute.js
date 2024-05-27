const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/aulth');
const { post , all } = require('../controller/postControaller');



router.post('/upload',post );
router.get('/all',all );
router.post('/', authMiddleware);


module.exports = router;