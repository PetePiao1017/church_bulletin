const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  church_name: {
    type: String,
    required: true
  },
  church_url: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true,
  },
  email:{
    type:String,
    required:true,
  },
  password:{
    type:String,
    required:true,
  },
  public:{
    type: Boolean,
    default: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('user', UserSchema);
