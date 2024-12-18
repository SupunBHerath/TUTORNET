const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  mobileNumber: {
    type: String,
    required: true,
  },
  stream: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  terms: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    enum: ['student'],
    required: true,
  },
});

studentSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

studentSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id, role: 'student' }, process.env.SECRET_KEY, { expiresIn: '7d' });
  return token;
};

module.exports = mongoose.model('Student', studentSchema);
