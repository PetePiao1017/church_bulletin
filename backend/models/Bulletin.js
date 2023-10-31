const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulletinSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  header_id :{
    type: Schema.Types.ObjectId,
    ref: 'header'
  },
});

module.exports = mongoose.model('bulletin', BulletinSchema);
