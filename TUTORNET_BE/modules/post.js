const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const post = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'userModel'
  },
  userModel: {
    type: String,
    required: true,
    enum: ['Teacher', 'Admin']
  },
  title: {
    type: String,
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
