const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // json format eken ena eka javascript object ekak bawat convert krna eka
const cors = require('cors');
const dotenv = require('dotenv');
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 3000;

// app middleware 
app.use(cors());
app.use(bodyParser.json());
app.disable('x-powered-by');//less hackers know about our stack

const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

});


const connection  = mongoose.connection;
connection.once('open', ()=>{
    console.log('Connected to MongoDB');
});

const teacherRouter=require('./router/teacher');
app.use('/teacher',teacherRouter);

const studentRouter=require('./router/student');
app.use('/student',studentRouter);



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
});