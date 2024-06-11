const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new mongoose.Schema({
    userName: {
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
    teacherId: { 
      type: String,
       required: true 
      },
    teacherName: {
       type: String,
        required: true 
      },
    avatarUrl: {
       type: String
      },
    status: {
      type: String,
      required: true,
      default: "Visible"
     },
    uploadedDay: {
        type: Date,
        required: true,
        default: Date.now 
      }
});

const FeedBack = mongoose.model('FeedBack', feedbackSchema);
module.exports = FeedBack;
