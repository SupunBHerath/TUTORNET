require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const Student = require('./models/Student');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const passwordReset = require('./routes/passwordReset');

const questionRoutes = require('./routes/questions');





const app = express();


mongoose.connect(process.env.MONGODB_URI)
  

.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: 'http://localhost:3000' }));
}
app.use(express.json());
app.use(bodyParser.json());


app.use('/api', passwordReset);
app.use('/api', questionRoutes); 




app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, role, mobileNumber, stream, subject, district, institute, famousName, studyAt, terms } = req.body;

    const existingUser = await User.findOne({ email });
    const existingStudent = await Student.findOne({ email });

    if (existingUser || existingStudent) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

   

    const user = new User({
      name,
      email,
      password,
      role,
      mobileNumber,
      stream,
      subject,
      district,
      institute,
      famousName,
      studyAt,
      terms,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id, role }, process.env.SECRET_KEY, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful!', token });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/api/signup-student', async (req, res) => {
  try {
    const { name, email, password, mobileNumber, stream, subject, district, terms } = req.body;

    const existingUser = await User.findOne({ email });
    const existingStudent = await Student.findOne({ email });

    if (existingUser || existingStudent) {
      return res.status(400).json({ message: 'Email already exists.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }
    
   
    const student = new Student({
      name,
      email,
      password,
      mobileNumber,
      stream,
      subject,
      district,
      terms,
      role: 'student',
    });

    await student.save();

    const token = jwt.sign({ _id: student._id, role: 'student' }, process.env.SECRET_KEY, { expiresIn: '7d' });
    res.status(201).json({ message: 'Registration successful!', token });
  } catch (error) {
    console.error('Error during student registration:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});

app.post('/api/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    let role = 'teacher';

    if (!user) {
      user = await Student.findOne({ email });
      role = 'student';
    }

    if (!user) {
      return res.status(400).json({ message: 'You are not registered.' });
    }
    const salt = user.salt;

    
    
    const isMatch = await bcrypt.compare(password, user.password);
   
    if (!isMatch) {
      
      return res.status(400).json({ message: 'Password incorrect.' });
    }

    const token = jwt.sign({ _id: user._id, role }, process.env.SECRET_KEY, { expiresIn: '7d' });

    res.status(200).json({ message: 'Sign in successful!', token, role });
  } catch (error) {
    
    res.status(500).json({ message: 'Internal server error.' });
  }
});
app.use('/api', auth);
app.get('/api/teacher-profile', auth, async(req, res) => {
  try {
    // Fetch teacher profile data from the database based on the authenticated user ID
    const teacherProfile = await Teacher.findOne({ userId: req.user.id });

    if (!teacherProfile) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    res.status(200).json(teacherProfile);
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/student-profile', auth, async (req, res) => {
  try {
    // Fetch student profile data from the database based on the authenticated user ID
    const studentProfile = await Student.findOne({ userId: req.user.id });

    if (!studentProfile) {
      return res.status(404).json({ message: 'Student profile not found' });
    }

    res.status(200).json(studentProfile);
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server listening on port ${port}`));