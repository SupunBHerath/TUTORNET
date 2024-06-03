const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
    userId: {
      type: String,
      required: true 
    },
    title: {
      type: String,
      required: true 
    },
    username: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    uploadedDay: {
      type: Date,
      required: true,
      default: Date.now 
    },
   
    profileImage: {
      type: String,
      required: true,
    },
   
    uploadImageId: {
      type: String,
      required: true,
    },
   
    status: {
      type: String,
      required: true,
      default: "visible" 
    }
});

const Post = mongoose.model('Post', post);
module.exports = Post;
