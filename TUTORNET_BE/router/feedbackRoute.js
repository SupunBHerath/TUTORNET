const express = require('express');
const router = express.Router();
const controller = require('../controller/feedBackController');


router.get('/',controller.all );
router.get('/:id',controller.get );
router.post('/',controller.post );

module.exports = router;
