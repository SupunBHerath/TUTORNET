const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resultSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    indexNumber: {
        type: String,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});
const timeTable = new Schema({
    description: {
        type: String,
        // required: true
    },
    image: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, 'Please provide a unique email address'],
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    district: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: false
    },
    livesIn: {
        type: String,
        required: false
    },
    classlocations: {
        type: String,
        required: false
    },
    education: {
        type: String,
        required: false
    },
    mobile: {
        type: String,
        required: false
    },
    landline: {
        type: String,
        required: false
    },
    profilePicture: {
        type: String,
        required: false
    },
    coverPhoto: {
        type: String,
        required: false
    },
    results: [resultSchema], 
    timeTable: [timeTable],
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Teacher = mongoose.model('Teacher', teacherSchema);
module.exports = Teacher;
