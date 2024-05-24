const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // json format eken ena eka javascript object ekak bawat convert krna eka
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();
const router = require('./router/router')
const teacher = require('./router/teacherRouter');
const Student = require('./router/student');
const admin = require('./router/admin.js');
const ads = require('./router/uploadImage.js');
const reqads = require('./controller/requestAdsController.js');
const validate = require('./router/validate.js');
const mail = require('./Mail/adsSubmit.js');



/** middlwares */
app.use(express.json());
app.use(cors());
app.use(morgan('try'));
app.disable('x-powerd-by') // less hackers know about our stack

const PORT = 8080 || 3000;

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
app.use('/student',Student)
app.use('/admin',admin)
app.use('/ads',ads)
app.use('/reqads',reqads)
app.use('/validate',validate)

//mail
app.use('/mail',mail)

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
app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`)
})