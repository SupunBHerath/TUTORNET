const express = require('express');
const multer = require('multer');
const path = require('path');
const Ads = require('../modules/requestAds');
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
// const formidable = require('formidable');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// Define storage for the uploaded images
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//     destination: function (req, file, cb) {
//         cb(null, 'public/images');
//     },
//     filename: function (req, file, cb) {
//         const randomNumber = getRandomInt(1000, 9999); // Generate a random number between 1000 and 9999
//         const extension = path.extname(file.originalname); // Get the file extension
//         const basename = path.basename(file.originalname, extension); // Get the original name without the extension
//         cb(null, `TUTORNET-${basename}-${randomNumber}${extension}`);
//     }
// });


// router.post('/', upload.fields([{ name: 'ads', maxCount: 1 }, { name: 'rec', maxCount: 1 }]), async (req, res) => {
//     const { userId, payDay, location, payment } = req.body;

//     if (!userId || !payDay || !location || !payment || !req.files['ads'] || !req.files['rec']) {
//         return res.status(400).send('Insufficient data or number of images.');
//     }

//     const ads = req.files['ads'][0].path;
//     const rec = req.files['rec'][0].path;

//     const currentDate = new Date();
//     const dateOnly = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());

//     try {
//         const adsData = new Ads({
//             userId: userId,
//             payDay: payDay,
//             location: location,
//             payment: parseFloat(payment),
//             ads: ads,
//             rec: rec,
//             uploadedDay: dateOnly,
//             status: 'pending'
//         });

//         await adsData.save();
//         res.send({ imagePath: rec });
//     } catch (err) {
//         console.error(err);
//         res.status(500).send('Error while saving data.');
//     }
// });
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ADS', // Optional, specify the folder in Cloudinary to upload files to
        allowed_formats: ['jpg', 'jpeg', 'png'], // Optional, specify allowed formats
       
    }
});

const upload = multer({ storage: storage });


// Check if Cloudinary environment variables are set
if (!process.env.CLOUD_NAME || !process.env.CLOUD_KEY || !process.env.CLOUD_KEY_SECRET) {
    console.error('Cloudinary environment variables are not set.');
    process.exit(1); // Exit the process
}

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
});


router.post('/', upload.fields([{ name: 'ads' }, { name: 'rec' }]), async (req, res) => {
    try {
        // Extract data from the request
        const { userId, location, payDay, payment } = req.body;
        const { ads, rec } = req.files;

        // Check if all required fields are present
        if (!userId || !location || !payDay || !payment || !ads || !rec) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Upload images to Cloudinary
        const adsResult = await cloudinary.uploader.upload(ads[0].path);
        const recResult = await cloudinary.uploader.upload(rec[0].path);

        // Save data to MongoDB
        const newAd = new Ads({
            userId,
            ads: adsResult.secure_url, // store the secure URL of the image
            rec: recResult.secure_url, // store the secure URL of the image
            location,
            payDay,
            payment
        });
        await newAd.save();

        res.status(201).json({ message: 'Ad created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
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

router.put('/update', async (req, res) => {
    try {
      const updates = req.body;
  
      // Process each update request
      const updatePromises = updates.map(async (update) => {
        const { _id, ...rest } = update; // Exclude _id from the update data
        return Ads.findByIdAndUpdate(_id, rest, { new: true });
      });
  
      const updatedDocs = await Promise.all(updatePromises);
  
      if (updatedDocs.some(doc => !doc)) {
        return res.status(404).json({ error: 'One or more documents not found' });
      }
  
      res.json(updatedDocs);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dataToDelete = await Ads.findById(id);
        if (!dataToDelete) {
            return res.status(404).send('Data not found');
        }

        // Delete the associated images
        fs.unlinkSync(dataToDelete.ads);
        fs.unlinkSync(dataToDelete.rec);

        // Delete the document
        await Ads.findByIdAndDelete(id);
        
        res.send('Data and associated images deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/pending', async (req, res) => {
    try {
        const pendingRecords = await Ads.find({ status: 'pending' });
        
        res.json(pendingRecords);
    } catch (err) {
        console.error('Error fetching pending records:', err);
        
        // Respond with a 500 status code and an error message
        res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/done', async (req, res) => {
    try {
        const pendingRecords = await Ads.find({ status: 'Done' });
        
        res.json(pendingRecords);
    } catch (err) {
        console.error('Error fetching pending records:', err);
        
        // Respond with a 500 status code and an error message
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
