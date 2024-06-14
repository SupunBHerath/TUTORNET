const express = require('express');
const router = express.Router();
const controller = require('../controller/feedBackController');


router.get('/',controller.all );
router.get('/rating/:id',controller.userRatingPercentage );
router.get('/:id',controller.get );
router.post('/',controller.post );
router.put('/:id',controller.update );
router.delete('/:id',controller.Delete );

module.exports = router;
