const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    nickname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:[true,'please provide a unique email address'],
        required:true
    },
    password:{
        type:String,
        required:true
    },
    district:{
        type:String,
        required:true
    },
    subject : {
        type:String,
        required:true
    },
    role : {
        type:String,
        required:true
    }

 
   
})

const Teacher =mongoose.model('Teacher',teacherSchema);
module.exports = Teacher;
