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
    grade:{
        type:String,
        required:true
    },
    subject : {
        type:String,
        required:true
    }
});

const Student = mongoose.model('StudentDetails',studentSchema);
module.exports = Student; 