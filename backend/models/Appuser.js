const mongoose = require('mongoose');

const AppUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  fullname: {
    type: String,
    required: true
  },
  phonenumber: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
  invited: [
    {
      type: String,
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('appuser', AppUserSchema);
