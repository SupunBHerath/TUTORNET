const express = require('express');
const router = express.Router();
const controller = require('../controller/AdsController');

router.post('/create', controller.createAd);
router.get('/all', controller.getAllAds);
router.get('/delete/:id', controller.deleteAdById);
// router.get('/seacher', controller.search);
// router.get('/wall', controller.wall);

module.exports = router;