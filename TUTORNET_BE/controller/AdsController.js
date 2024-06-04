const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');
const Ads = require('../modules/ads');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'ads',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

const upload = multer({ storage: storage }).single('image');

module.exports.createAd = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(500).json({ message: 'File upload error', error: err.message });
    }

    try {
      if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      const newAd = new Ads({
        location: req.body.location,
        image: result.secure_url,
        level: 1,
        uploadedDay: new Date(),
      });

      const savedAd = await newAd.save();

      res.status(201).json(savedAd);
    } catch (error) {
      console.error('Error creating ad:', error);
      res.status(500).json({ message: 'Server Error', error: error.message });
    }
  });
};

module.exports.getAllAds = async (req, res) => {
  try {
    const ads = await Ads.find();
    res.json(ads);
  } catch (error) {
    console.error('Error fetching ads:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports.getAdById = async (req, res) => {
  try {
    const ad = await Ads.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    console.error('Error fetching ad:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports.updateAdById = async (req, res) => {
  try {
    const { location, image, level } = req.body;
    const ad = await Ads.findByIdAndUpdate(
      req.params.id,
      { location, image, level },
      { new: true }
    );
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json(ad);
  } catch (error) {
    console.error('Error updating ad:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports.deleteAdById = async (req, res) => {
  try {
    const ad = await Ads.findByIdAndDelete(req.params.id);
    if (!ad) {
      return res.status(404).json({ message: 'Ad not found' });
    }
    res.json({ message: 'Ad deleted successfully' });
  } catch (error) {
    console.error('Error deleting ad:', error);
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};
