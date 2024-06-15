const Feedback = require('../modules/webFeedback');

module.exports.createFeedback = async (req, res) => {
  try {
    const { name, rating, message } = req.body; 


    const newFeedback = new Feedback({
      name,
      rating,
      message,
    });

    await newFeedback.save();

    // Respond with success message
    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ error: 'Server error' });
  }
};
