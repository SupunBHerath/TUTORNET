const Teacher = require('../modules/teacher');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

// Set up Cloudinary storage for multer
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'timeTables',
    allowedFormats: ['jpg', 'png', 'jpeg'],
  },
});

const upload = multer({ storage });

// Create a new time table entry
const createTimeTable = async (req, res) => {
  const { teacherId } = req.params;
  const { description } = req.body;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Upload image to Cloudinary
    const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);

    teacher.timeTable.push({ description, image: cloudinaryResponse.secure_url });
    await teacher.save();

    res.status(201).json({ message: 'Time table created successfully', data: teacher.timeTable });
  } catch (error) {
    console.error('Error creating time table:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Get all time table entries
const getTimeTable = async (req, res) => {
  const { teacherId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    res.status(200).json({ message: 'Time table entries retrieved successfully', data: teacher.timeTable });
  } catch (error) {
    console.error('Error fetching time table entries:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Update an existing time table entry
const updateTimeTable = async (req, res) => {
  const { teacherId, timeTableId } = req.params;
  const { description } = req.body;
  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const timeTable = teacher.timeTable.id(timeTableId);
    if (!timeTable) {
      return res.status(404).json({ message: 'Time table entry not found' });
    }

    if (description) {
      timeTable.description = description;
    }

    // Update image if provided
    if (req.file) {
      const cloudinaryResponse = await cloudinary.uploader.upload(req.file.path);
      timeTable.imageUrl = cloudinaryResponse.secure_url;
    }

    await teacher.save();

    res.status(200).json({ message: 'Time table entry updated successfully', data: timeTable });
  } catch (error) {
    console.error('Error updating time table entry:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

// Delete an existing time table entry
const deleteTimeTable = async (req, res) => {
  const { teacherId, timeTableId } = req.params;

  try {
    const teacher = await Teacher.findById(teacherId);

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    const timeTable = teacher.timeTable.id(timeTableId);
    if (!timeTable) {
      return res.status(404).json({ message: 'Time table entry not found' });
    }

    teacher.timeTable.pull({ _id: timeTableId });
    await teacher.save();

    res.status(200).json({ message: 'Time table entry deleted successfully' });
  } catch (error) {
    console.error('Error deleting time table entry:', error);
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

module.exports = {
  createTimeTable: [upload.single('image'), createTimeTable],
  getTimeTable,
  updateTimeTable: [upload.single('image'), updateTimeTable],
  deleteTimeTable,
};
