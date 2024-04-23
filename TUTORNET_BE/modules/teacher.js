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
    }

 
   
})

const user =mongoose.model('Teacher',teacherSchema);
module.exports = user;
