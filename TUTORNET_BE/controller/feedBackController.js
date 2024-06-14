const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const FeedBack = require('../modules/feedback');
const controller = require('../controller/feedBackController');

module.exports.all = async (req, res) => {
    try {
        const feedback = await FeedBack.find();
        res.status(200).json(feedback);
    } catch {
        console.error(error);
    }
};

module.exports.post = async (req, res) => {
    const feedback = new FeedBack({
        teacherName: req.body.teacherName,
        userName: req.body.userName,
        comment: req.body.comment,
        rating: req.body.rating,
        avatarUrl: req.body.avatarUrl,
        teacherId: req.body.teacherId,
        status: 'Visible'
    });
    console.log(feedback);
    try {
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.get = async (req, res) => {
    try {
        const feedback = await FeedBack.find({ teacherId: req.params.id, status: 'Visible' }).sort({ uploadedDay: -1 });
        res.status(200).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}
module.exports.userRatingPercentage = async (req, res) => {
    const { id } = req.params;

    try {

        const allFeedback = await FeedBack.find();
        let totalRating = 0;
        allFeedback.forEach(rating => {
            totalRating += rating.rating;
        });
        const userFeedback = await FeedBack.find({ teacherId: id });
        let userRating = 0;
        userFeedback.forEach(rating => {
            userRating += rating.rating;
        });
        const userTotalRating = (userRating / totalRating)*10;
        res.status(200).json({ totalRatings: totalRating, userTotalRatings: userTotalRating});

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
};

module.exports.update = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const result = await FeedBack.updateOne(
            { _id: id },
            { $set: { status: status } }
        );

        if (result.matchedCount > 0) {
            res.status(200).send(`Successfully updated the document with _id ${id}`);
        } else {
            res.status(404).send(`No document found with _id ${id}`);
        }
    } catch (err) {
        console.error('Error updating document', err);
        res.status(500).send('Internal server error');
    }
};
module.exports.Delete = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await FeedBack.findByIdAndDelete({ _id: id });

        if (result.matchedCount > 0) {
            res.status(200).send(`Successfully updated the document with _id ${id}`);
        } else {
            res.status(404).send(`No document found with _id ${id}`);
        }
    } catch (err) {
        console.error('Error updating document', err);
        res.status(500).send('Internal server error');
    }
};