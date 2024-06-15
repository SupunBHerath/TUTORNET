const express = require('express');
const multer = require('multer');
const path = require('path');
const Ads = require('../modules/requestAds');
const Teacher = require('../modules/teacher.js')
const router = express.Router();
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const nodemailer = require('nodemailer');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ADS',
        allowed_formats: ['jpg', 'jpeg', 'png'],

    }
});

const upload = multer({ storage: storage });


if (!process.env.CLOUD_NAME || !process.env.CLOUD_KEY || !process.env.CLOUD_KEY_SECRET) {
    console.error('Cloudinary environment variables are not set.');
    process.exit(1);
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_KEY_SECRET,
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_GMAIL,
        pass: process.env.MY_PASSWORD
    }
});

router.post('/', upload.fields([{ name: 'ads' }, { name: 'rec' }]), async (req, res) => {
    try {
        const { userId, location, payDay, payment } = req.body;
        const { ads, rec } = req.files;

        if (!userId || !location || !payDay || !payment || !ads || !rec) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const adsResult = await cloudinary.uploader.upload(ads[0].path);
        const recResult = await cloudinary.uploader.upload(rec[0].path);

        const newAd = new Ads({
            userModel: 'Teacher',
            userId,
            ads: adsResult.secure_url,
            rec: recResult.secure_url,
            location,
            payDay,
            payment
        });
        await newAd.save();

        res.status(201).json({ message: 'Ad created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.route('/all').get((req, res) => {
    Ads.find()
        .populate('userId', 'name profilePicture email')
        .then(data => {
            res.status(201).json(data);
            console.log(data);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});

router.put('/update', async (req, res) => {
    try {
        const updates = req.body;

        const updatePromises = updates.map(async (update) => {
            const { _id, status, userId } = update; 
            const updatedAd = await Ads.findByIdAndUpdate(_id, { status }, { new: true });

            if (!updatedAd) {
                throw new Error(`Advertisement with ID ${_id} not found`);
            }

            const statusClass = status === 'Done' ? 'status-done' : 'status-rejected';

            const mailOptions = {
                from: process.env.MY_GMAIL,
                to: process.env.MY_GMAIL, 
                subject: 'Advertisement Status Update',
                html: `
                  <html>
                    <head>
                      <style>
                        body {
                          font-family: Arial, sans-serif;
                          line-height: 1.6;
                          background-color: #f2f2f2;
                          padding: 20px;
                        }
                        .container {
                          max-width: 600px;
                          margin: 0 auto;
                          background-color: #fff;
                          padding: 30px;
                          border-radius: 5px;
                          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                          color: #333;
                        }
                        .status-done {
                          background-color: #d4edda;
                          border-color: #c3e6cb;
                          color: #155724;
                          padding: 10px;
                          border-radius: 5px;
                        }
                        .status-rejected {
                          background-color: #f8d7da;
                          border-color: #f5c6cb;
                          color: #721c24;
                          padding: 10px;
                          border-radius: 5px;
                        }
                      </style>
                    </head>
                    <body>
                      <div class="container">
                        <h2>Advertisement Status Update</h2>
                        <p>
                          The status of your advertisement has been updated to <strong>${status}</strong>.
                        </p>
                        <div class="${statusClass}">
                          Status: ${status}
                        </div>
                        ${status === 'Reject' ? `
                          <p>
                            Unfortunately, your advertisement has been rejected. Please contact our support team for more information.
                          </p>
                          <p>
                            You can <a href="https://example.com/support">contact us here</a>.
                          </p>
                        ` : ''}
                        <p>
                          You can <a href="https://example.com">log in here</a> to view your advertisement details.
                        </p>
                        <p>
                          Regards,<br>
                          Your Company Name
                        </p>
                      </div>
                    </body>
                  </html>
                `
            };

            await transporter.sendMail(mailOptions);
            
            return updatedAd;
        });

        const updatedDocs = await Promise.all(updatePromises);

        res.json(updatedDocs);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.put('/status/update/:id', async (req, res) => {
    try {
        const { status2 } = req.body;
        const _id = req.params.id;
        const updatedAd = await Ads.findByIdAndUpdate(_id, { status2 }, { new: true });

        const mailOptions = {
            from: process.env.MY_GMAIL,
            to: process.env.MY_GMAIL,
            subject: 'Advertisement Status Update',
            html: `
            <html>
                <head>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            line-height: 1.6;
                            background-color: #f2f2f2;
                            padding: 20px;
                        }
                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background-color: #fff;
                            padding: 30px;
                            border-radius: 5px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        h2 {
                            color: #333;
                        }
                        .status-done {
                            background-color: #d4edda;
                            border-color: #c3e6cb;
                            color: #155724;
                            padding: 10px;
                            border-radius: 5px;
                        }
                        .status-rejected {
                            background-color: #f8d7da;
                            border-color: #f5c6cb;
                            color: #721c24;
                            padding: 10px;
                            border-radius: 5px;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <h2>Advertisement Status Update</h2>
                        <p>
                            The status of your advertisement has been updated to <strong>${status2}</strong>.
                        </p>
                        <div class="${status2 === 'Running' ? 'status-done' : 'status-rejected'}">
                            Status: ${status2}
                        </div>
                        ${status2 === 'Stopped' ? `
                            <p>
                                Unfortunately, your advertisement has been rejected. Please contact our support team for more information.
                            </p>
                            <p>
                                You can <a href="https://example.com/support">contact us here</a>.
                            </p>
                        ` : ''}
                        <p>
                            You can <a href="https://example.com">log in here</a> to view your advertisement details.
                        </p>
                        <p>
                            Regards,<br>
                            Your Company Name
                        </p>
                    </div>
                </body>
            </html>
        `
        };


        if (!updatedAd) {
            return res.status(404).json({ error: 'Advertisement not found' });
        }

        res.status(200).json(updatedAd);
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error(error);
                console.log(error.message);
                return res.status(500).json({ error: 'Internal Server Error' });
               
            } else {
                console.log('Email sent:', info.response);


                
                return res.status(200).json({ message: 'sent successfully' });
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



router.delete('/delete/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const dataToDelete = await Ads.findById(id);
        if (!dataToDelete) {
            return res.status(404).send('Data not found');
        }
        await Ads.findByIdAndDelete(id);

        res.send('Data and associated images deleted successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});



router.get('/pending', async (req, res) => {
    try {
        const pendingRecords = await Ads.find({ status: 'Pending' });

        res.json(pendingRecords);
    } catch (err) {
        console.error('Error fetching pending records:', err);

        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/done', async (req, res) => {
    try {
        const pendingRecords = await Ads.find({ status: 'Done' });

        res.json(pendingRecords);
    } catch (err) {
        console.error('Error fetching pending records:', err);

        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/create', upload.fields([{ name: 'ads' }]), async (req, res) => {
    try {
        const { location, userId } = req.body;
        const { ads } = req.files;



        const adsResult = await cloudinary.uploader.upload(ads[0].path);

        const newAd = new Ads({
            userId,
            userModel: 'Admin',
            ads: adsResult.secure_url,
            rec: "admin",
            location,
            payDay: '.....',
            payment: '0000',
            status2: 'Running',
            status: 'Done'
        });
        await newAd.save();

        res.status(201).json({ message: 'Ad created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});



module.exports = router;
