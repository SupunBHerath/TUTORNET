const express = require('express');
const router = express.Router();
const subjectController = require('../controller/subjectControal');

router.get('/all', subjectController.all);
router.get('/v', subjectController.visible);
router.post('/add', subjectController.add);
router.delete('/:id', subjectController.delete);
router.put('/:id', subjectController.update);

module.exports = router;
