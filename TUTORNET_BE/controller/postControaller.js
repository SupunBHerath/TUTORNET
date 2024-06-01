const Post = require('../modules/post.js');
const dotenv = require('dotenv');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'post',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  }
});

const upload = multer({ storage: storage }).single('image'); 

// Define the post upload method

const post = async (req, res) => {
  try {
    // Execute multer middleware
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error uploading file' });
      }

      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path);

      // Create a new post instance
      const newPost = new Post({
        userId: req.body.userId,
        title: req.body.title,
        username: req.body.username,
        image: result.secure_url, // Save the image URL from Cloudinary
        description: req.body.description,
        status: req.body.status || 'visible', // Set status to 'visible' if not provided
      });

      // Save the new post to the database
      const savedPost = await newPost.save();

      // Respond with the saved post details
      res.status(201).json({ message: 'Successfully uploaded post', data: savedPost });
    });
  } catch (error) {
    console.error('Error uploading post:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
const all =async (req, res, ) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}
module.exports = {
  post: post,
  all:all
};
