const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const otp = new Schema({
    email: {
      type:String,
      required:true 
    },
    otp: {
      type:String,
      required:true 
    },
    id: {
      type:String,
      required:true 
    },
    createdAt: {
      type: Date,
      expires: 300, 
      default: Date.now
  }

});

const OTP =mongoose.model('Otp',otp) ;
module.exports = OTP;
