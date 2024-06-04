const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // json format eken ena eka javascript object ekak bawat convert krna eka
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();
const router = require('./router/router.js')
const teacher = require('./router/teacherRouter.js');
const Student = require('./router/student.js');
const admin = require('./router/admin.js');
const ads = require('./router/uploadImage.js');
const reqads = require('./controller/requestAdsController.js');
const validate = require('./router/validate.js');
const post = require('./router/postRoute.js');
const mail = require('./Mail/adsSubmit.js');
const path =    require('path');
const feedBack = require('./router/feedbackRoute.js');
const Subject = require('./router/subject.js');
const Ads = require('./router/ads.js');


app.use(express.json());
app.use(cors());
app.use(morgan('try'));
app.disable('x-powerd-by')

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
// app.use('/ads',ads)
app.use('/reqads',reqads)
app.use('/validate',validate)
app.use('/post',post)
app.use('/feedback',feedBack)
app.use('/subject',Subject)
app.use('/ads',Ads)
//mail
app.use('/mail',mail)

app.use('/uploads', express.static(path.join(__dirname)));
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