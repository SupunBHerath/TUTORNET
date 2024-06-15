const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqAdsSchema = new Schema({
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
  payDay: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  payment: {
    type: Number,
    required: true
  },
  ads: {
    type: String,
    required: true
  },
  rec: {
    type: String,
    required: true
  },
  uploadedDay: {
    type: Date,
    required: true,
    default: Date.now
  },

  status: {
    type: String,
    required: true,
    default: "Pending"
  },

  status2: {
    type: String,
    required: true,
    default: "Running"
  }
});

const ReqAds = mongoose.model('Advertise', reqAdsSchema);
module.exports = ReqAds;
