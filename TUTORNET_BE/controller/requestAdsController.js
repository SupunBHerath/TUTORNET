const express = require('express');
const multer = require('multer');
const path = require('path');
const Ads = require('../modules/requestAds');
const Teacher = require('../modules/teacher.js')
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ADS', 
        allowed_formats: ['jpg', 'jpeg', 'png'], 
       
    }
});

const upload = multer({ storage: storage });


if (!process.env.CLOUD_NAME || !process.env.CLOUD_KEY || !process.env.CLOUD_KEY_SECRET) {
    console.error('Cloudinary environment variables are not set.');
    process.exit(1); 
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
});


router.post('/', upload.fields([{ name: 'ads' }, { name: 'rec' }]), async (req, res) => {
    try {
        const { userId, location, payDay, payment } = req.body;
        const { ads, rec } = req.files;

        if (!userId || !location || !payDay || !payment || !ads || !rec) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const adsResult = await cloudinary.uploader.upload(ads[0].path);
        const recResult = await cloudinary.uploader.upload(rec[0].path);

        const newAd = new Ads({
            userId,
            ads: adsResult.secure_url, 
            rec: recResult.secure_url, 
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
        .populate('userId', 'name profilePicture email')
        .then(data => {
            res.status(201).json(data);
            console.log(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

router.put('/update', async (req, res) => {
    try {
      const updates = req.body;
      const _id  = req.params.id;
  
      
      const updatePromises = updates.map(async (update) => {
        const { _id, ...rest } = update; 
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
  router.put('/status/update/:id', async (req, res) => {
    try {
      const { status2 } = req.body;
      const _id = req.params.id;
  
      const updatedAd = await Ads.findByIdAndUpdate(_id, { status2 }, { new: true });
  
      if (!updatedAd) {
        return res.status(404).json({ error: 'Advertisement not found' });
      }
  
      res.status(200).json(updatedAd);
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
        
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/done', async (req, res) => {
    try {
        const pendingRecords = await Ads.find({ status: 'Done' });
        
        res.json(pendingRecords);
    } catch (err) {
        console.error('Error fetching pending records:', err);
        
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
