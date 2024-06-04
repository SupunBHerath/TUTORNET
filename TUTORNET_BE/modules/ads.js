const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ads = new Schema({
    location: {
      type:String,
      required:true 
    },
    image: {
        type:String,
        required:true
    },
    leveal: {
        type:Number,
    },
     uploadedDay: {
      type: Date,
      required: true,
      default: Date.now // Set default value to current date
  }

});

const Ads =mongoose.model('Ads',ads) ;
module.exports = Ads;
