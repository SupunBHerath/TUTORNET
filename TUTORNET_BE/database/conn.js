const mongoose = require('mongoose');
require('dotenv').config();

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = connection;
