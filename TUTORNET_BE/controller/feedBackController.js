const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const FeedBack = require('../modules/feedback');
const controller = require('../controller/feedBackController');

module.exports.all = async(req , res )=>{
    try{
      const feedback = await FeedBack.find();
      res.status(200).json(feedback);
    }catch{
    console.error(error);
    }
}; 

module.exports.post =  async (req , res) => {
    const feedback = new FeedBack({
        userName: req.body.userName,
        comment: req.body.comment,
        rating: req.body.rating,
        avatarUrl: req.body.avatarUrl,
        teacherId: req.body.teacherId,
        status:'pending'
    });

    try {
        const newFeedback = await feedback.save();
        res.status(201).json(newFeedback);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}
module.exports.get =  async (req , res) => {
    try {
        const feedback = await FeedBack.find({ teacherId: req.params.id }).sort({ uploadedDay: -1 });
        res.status(200).json(feedback);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || 'Internal Server Error' });
    }
}