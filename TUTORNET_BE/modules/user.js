const mongoose = require('mongoose');
const Schema = mongoose.Schema;

 const UserSchema = mongoose.Schema({
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
        unique:true
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

const user =mongoose.model('User',UserSchema) || mongoose.model.Users;
module.exports = user;
