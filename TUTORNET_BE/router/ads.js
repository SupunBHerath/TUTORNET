const express = require('express');
const router = express.Router();
const controller = require('../controller/AdsController');

router.post('/create', controller.createAd);
router.get('/all', controller.getAllAds);
router.delete('/delete/:id', controller.deleteAdById);

module.exports = router;