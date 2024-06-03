const Subject = require('../modules/subject'); 

module.exports.all = async (req, res) => {
  try {
    const subjects = await Subject.find().sort({ title: 1 });
    res.status(200).json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.visible = async (req, res) => {
    try {
      const subjects = await Subject.find({ status: 'Visible' }).sort({ title: 1 });
      res.status(200).json(subjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };

module.exports.add = async (req, res) => {
  try {
    const subject = new Subject({ title: req.body.title, visible: req.body.visible });
    await subject.save();
    res.status(201).json(subject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    await Subject.findByIdAndDelete(id);
    res.status(200).json({ message: 'Subject deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSubject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(updatedSubject);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
