const Teacher = require('../modules/teacher.js');
const multer = require('multer');
const mongoose = require('mongoose');
const XLSX = require('xlsx'); 


const upload = multer({ dest: 'uploads/' }); // Set destination folder for uploaded files


module.exports.uploadResult = [
  upload.single('file'),
  async (req, res) => {
    const { teacherId } = req.body;
    const file = req.file;

  
    if (!file || file.size === 0) {
      return res.status(400).send('Empty file uploaded.');
    }

    if (!teacherId || !mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: 'Invalid teacher ID' });
    }

    try {

      const workbook = XLSX.readFile(file.path);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

 
      const results = json.map(item => ({
        name: item['Name'],
        indexNumber: item['Index Number'],
        result: item['Result'],
        year: item['Year']
      }));

    
      const teacher = await Teacher.findById(teacherId);
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }

      teacher.results.push(...results);
      await teacher.save();

      res.status(200).json({ message: 'Results uploaded successfully', uploadedResults: results});
    } catch (error) {
      console.error('Error processing file:', error);
      res.status(500).send('Error processing file: ' + error.message);
    }
  }
];




