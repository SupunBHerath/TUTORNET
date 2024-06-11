const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reqAdsSchema = new Schema({
    userId: {
      type: String,
      required: true 
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
      default: "pending" 
    }
});

const ReqAds = mongoose.model('ReqAds', reqAdsSchema);
module.exports = ReqAds;
