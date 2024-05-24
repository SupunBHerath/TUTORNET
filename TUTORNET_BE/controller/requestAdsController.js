const express = require('express');
const multer = require('multer');
const path = require('path');
const Ads = require('../modules/requestAds');
const router = express.Router();
const fs = require('fs');

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.fields([{ name: 'ads', maxCount: 1 }, { name: 'rec', maxCount: 1 }]), async (req, res) => {
    const { email, payDay, location, payment } = req.body;

    if (!email || !payDay || !location || !payment || !req.files['ads'] || !req.files['rec']) {
        return res.status(400).send('Insufficient data or number of images.');
    }

    const ads = req.files['ads'][0].path;
    const rec = req.files['rec'][0].path;

    const currentDate = new Date();
    const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

    try {
        const adsData = new Ads({
            email: email,
            payDay: payDay,
            location: location,
            payment: parseFloat(payment),
            ads: ads,
            rec: rec,
            uploadedDay: dateOnly,
            status: 'pending'
        });

        await adsData.save();
        res.send({ imagePath: rec });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error while saving data.');
    }
});
router.route('/all').get((req, res) => {
    Ads.find()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

router.delete('/delete/:id', async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await Ads.findById(adId);

        if (!ad) {
            return res.status(404).send('Advertisement not found.');
        }

        // Delete the image files associated with the advertisement
        if (fs.existsSync(ad.receipt)) {
            fs.unlinkSync(ad.receipt);
        }
        ad.ads.forEach(image => {
            if (fs.existsSync(image)) {
                fs.unlinkSync(image);
            }
        });

        // Delete the ad from the database
        await ad.deleteOne();

        // Respond with a success message
        res.send('Advertisement deleted successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

module.exports = router;
