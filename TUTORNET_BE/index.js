const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();
const router = require('./router/router.js')
const teacher = require('./router/teacherRouter.js');
const Student = require('./router/student.js');
const admin = require('./router/admin.js');
const reqads = require('./controller/requestAdsController.js');
const validate = require('./router/validate.js');
const post = require('./router/postRoute.js');
const path =    require('path');
const feedBack = require('./router/feedbackRoute.js');
const Subject = require('./router/subject.js');
const webfeedbaack = require('./router/webFeedbackRoute.js');
const FP = require('./router/ForgotpasswordRoute.js');
const axios = require('axios');

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
app.use('/webfeedbaack',webfeedbaack)
app.use('/ads',reqads)
app.use('/validate',validate)
app.use('/post',post)
app.use('/feedback',feedBack)
app.use('/subject',Subject)
app.use('/otp',FP)

app.use('/uploads', express.static(path.join(__dirname)));
const URL = process.env.MONGODB_URL
mongoose.connect(URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,

});




const { GoogleGenerativeAI } = require("@google/generative-ai");
const { log } = require('console');

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});


app.post('/chat', async (req, res) => {
    const { prompt, history = [] } = req.body;

    try {
      
        const formattedHistory = history.map(msg => {
            return {
                role: msg.role,
                parts: msg.parts.map(part => {
                    return { text: part.text };
                })
            };
        });
        const chat = model.startChat({
            history: formattedHistory,
            generationConfig: {
                maxOutputTokens: 4096,
            },
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        res.status(200).json({ text, message: 'success' });
    } catch (err) {
        res.status(500).json({ message: 'Internal server error' });
    }
});






const connection  = mongoose.connection;
connection.once('open', ()=>{
    console.log('Connected to MongoDB');
});
/** start sever  */
app.listen(PORT || 3000, () => {
    console.log(`Server is running on port ${PORT}`)
})