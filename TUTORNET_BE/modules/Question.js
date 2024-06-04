const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Question', questionSchema);
