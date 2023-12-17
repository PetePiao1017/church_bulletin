const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  section_title: {
    type: String,
    required: true
  },
  background: {
    type: String,
    required: true
  },
  section_background: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('color', ColorSchema);
