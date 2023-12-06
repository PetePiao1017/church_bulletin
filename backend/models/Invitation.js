const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvitationSchema = new mongoose.Schema({
  code:{
    type: String,
  },
  number: {
    type: String,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('invitation', InvitationSchema);
