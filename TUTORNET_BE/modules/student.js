const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
      type:String,
      required:true 
    },
    email: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }, 
      date: {
        type: Date,
        required: true,
        default: Date.now
    }
  
});

const Student = mongoose.model('StudentDetails',studentSchema);
module.exports = Student; 