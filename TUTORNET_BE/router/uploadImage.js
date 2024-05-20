const express = require('express');
const multer = require('multer');
const path = require('path');
const Ads = require('../modules/ads.js');
const router = express.Router();
const fs = require('fs');

// Define storage for the uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder to 'uploads' in the root directory
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        // Set the file name to be unique by appending a timestamp
        cb(null, Date.now() + '-' + file.fieldname + path.extname(file.originalname));
    }
});

// Create the multer instance with the specified storage options
const upload = multer({ storage: storage });

// Define a route to handle image uploads
router.post('/upload', upload.single('image'), async (req, res) => {
    // If the file is successfully uploaded, send back the path
    if (req.file) {
        // Create a new Ads object with the image path and other necessary data
        const currentDate = new Date();
        const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
       
        // Create a new Ads object with the image path, current date, and other necessary data
        const ads = new Ads({
            image: req.file.path, // Use req.file.path to get the uploaded image path
            location: req.body.location, // Assuming location is sent in the request body
            uploadedDay: dateOnly // Add the current date as uploaded day
        });


        // Save the ad to the database
        await ads.save();

        res.send({ imagePath: req.file.path });
    } else {
        res.status(400).send('No file uploaded.');
    }
});
router.route('/all').get((req, res) => {
    Ads.find().then(data => {
        res.json(data);
    }).catch(err => {
        console.log(err);
    });
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const adId = req.params.id;
        const ad = await Ads.findById(adId);
        
        if (!ad) {
            return res.status(404).send('Advertisement not found.');
        }

        // Delete the image file associated with the advertisement
        if (fs.existsSync(ad.image)) {
            fs.unlinkSync(ad.image);
        }

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