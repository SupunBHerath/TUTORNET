const Post = require('../modules/post.js');
const Teacher = require('../modules/teacher.js');
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

const post = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: 'Error uploading file' });
      }

      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const result = await cloudinary.uploader.upload(req.file.path);

      const newPost = new Post({
        uploadImageId: result.public_id,
        userId: req.body.userId,
        title: req.body.title,
        image: result.secure_url,
        description: req.body.description,
        status: req.body.status || 'visible',
      });

      const savedPost = await newPost.save();
     
      res.status(201).json({ message: 'Successfully uploaded post', data: savedPost });
    });
  } catch (error) {
    console.error('Error uploading post:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const all = async (req, res) => {
  try {
    const posts = await Post.find();

    const response = await Promise.all(posts.map(async (post) => {
      const teacher = await Teacher.findById(post.userId);
      return {
        ...post.toObject(),
        teacher: {
          username: teacher.name,
          profileImage: teacher.profilePicture,
        },
      };
    }));

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};


const owersData = async (req, res) => {
  try {
    const posts = await Post.find({ userId: req.params.id });
    const response = await Promise.all(posts.map(async (post) => {
      const teacher = await Teacher.findById(post.userId);
      return {
        ...post.toObject(),
        teacher: {
          username: teacher.name,
          profileImage: teacher.profilePicture,
        },
      };
    }));
    res.status(200).json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

const Delete = async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);

    if (!deletedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }


    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  post: post,
  all: all,
  owersData: owersData,
  Delete: Delete,
};
