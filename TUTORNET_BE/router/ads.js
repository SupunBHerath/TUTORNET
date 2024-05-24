const express = require('express');
const router = express.Router();
const controller = require('../controller/requestAdsController');



router.post('/', controller.reqAds);

module.exports = router;