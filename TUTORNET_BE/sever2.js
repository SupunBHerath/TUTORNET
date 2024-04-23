const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // json format eken ena eka javascript object ekak bawat convert krna eka
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();
const router = require('./router/router')
const teacher = require('./router/teacher')




/** middlwares */
app.use(express.json());
app.use(cors());
app.use(morgan('try'));
app.disable('x-powerd-by') // less hackers know about our stack

const PORT = 8080;

/** HTTP GET  Request*/
app.get('/', (req, res) => {
    res.json({
        message: "Welcome to TutorNet",
        status: "200"
    })
})

/** api routers  */
app.use('/api',router)
app.use('/teacher',teacher)


/** start server only when we have valid connection */
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

});


const connection  = mongoose.connection;
connection.once('open', ()=>{
    console.log('Connected to MongoDB');
});
/** start sever  */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})