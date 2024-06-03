const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/aulth');
const { post , all, owersData, Delete} = require('../controller/postControaller');



router.post('/upload',post );
router.get('/all',all );
router.post('/', authMiddleware);
router.delete('/:id',Delete );
router.get('/:id',owersData);


module.exports = router;