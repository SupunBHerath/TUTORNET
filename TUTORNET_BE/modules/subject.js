const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subjectSchema = new Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: String,
    required: true,
    default: 'Visible',
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
}
});

module.exports = mongoose.model('Subject', subjectSchema);
