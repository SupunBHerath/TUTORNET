const Teacher = require('../modules/teacher.js');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const path = require('path');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

module.exports.register = async (req, res) => {
    try {
        const { username, email, password, district, nickname, subject } = req.body;

        if (!username || !email || !password || !district || !nickname || !subject) {
            return res.status(400).send({ error: "All fields are required." });
        }

        const existingUser = await Teacher.findOne({ email });
        if (existingUser) {
            return res.status(400).send({ error: "Please use a unique email." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new Teacher({
            name: username,
            nickname,
            email,
            password: hashedPassword,
            district,
            subject,
            role: 'Teacher'
        });

        await user.save();

        return res.status(200).send({ msg: "User registered successfully." });
    } catch (error) {
        console.error("Error registering user:", error);
        return res.status(500).send({ error: "Internal server error." });
    }
};

module.exports.all = async (req, res) => {
    Teacher.find()
        .then(teacher => {
            res.status(200).json(teacher)
        }).catch(err => {
            res.status(400).json({ message: err.message })
            console.log("error", err)
        })
};

module.exports.validated = async (req, res) => {
    try {
        const user = req.user;  
        res.status(200).json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports.teacher = async (req, res) => {
    const userId = req.params.id;
  
    try {
        const teacher = await Teacher.findById(userId);
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }
        res.json(teacher);
        console.log(teacher);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Profile',
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  }
});

const upload = multer({ storage: storage });

module.exports.updateTeacherProfile = [
  upload.fields([{ name: 'profilePicture', maxCount: 1 }, { name: 'coverPhoto', maxCount: 1 }]),
  async (req, res) => {
    const userId = req.params.id;
    const updateFields = req.body;

    try {
      if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: 'Invalid user ID' });
      }

      const existingTeacher = await Teacher.findById(userId);
      if (!existingTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      if (req.files && req.files.profilePicture) {
        const profilePicturePath = req.files.profilePicture[0].path;
        const uploadedProfilePicture = await cloudinary.uploader.upload(profilePicturePath);
        updateFields.profilePicture = uploadedProfilePicture.secure_url;
      }

      if (req.files && req.files.coverPhoto) {
        const coverPhotoPath = req.files.coverPhoto[0].path;
        const uploadedCoverPhoto = await cloudinary.uploader.upload(coverPhotoPath);
        updateFields.coverPhoto = uploadedCoverPhoto.secure_url;
      }

      for (const [key, value] of Object.entries(updateFields)) {
        existingTeacher[key] = value;
      }

      const updatedTeacher = await existingTeacher.save();

      res.json(updatedTeacher);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  }
];
