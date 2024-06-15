const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
    name: {
       type: String, 
       required: true 
      },
    comment: {
       type: String, 
       required: true 
      },
    rating: {
       type: Number,
        required: true 
      },
      time:{
        type: Date,
        required: true,
        default: Date.now
      }
});

const FeedBack = mongoose.model('WebFeedBack', feedbackSchema);
module.exports = FeedBack;
