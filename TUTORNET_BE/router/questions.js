const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Question = require('../models/Question');
const User = require('../models/User');
const Student = require('../models/Student');

// Submit a question
router.post('/questions', async (req, res) => {
  try {
    const { email, question } = req.body;

    const user = await User.findOne({ email }) || await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'You are not registered.' });
    }

    const newQuestion = new Question({
      email,
      question,
      userId: user._id,
    });

    await newQuestion.save();
    res.status(201).json({ message: 'Your question is submitted.' });
  } catch (error) {
    console.error('Error submitting question:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

// Delete a question
router.post('/questions/delete', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }) || await Student.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'You are not registered.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password incorrect.' });
    }

    const deletedQuestion = await Question.findOneAndDelete({ email });

    if (!deletedQuestion) {
      return res.status(400).json({ message: 'You have not asked any question previously.' });
    }

    res.status(200).json({ message: 'Your previous question is deleted.' });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

module.exports = router;
