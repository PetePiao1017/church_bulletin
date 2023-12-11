const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulletinSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  header_title: {
    type: String,
  },
  header_date: {
    type: String,
  },
  header_imageurl: {
    type: String,
  },
  number: [{}],
  todoList: [{}]
});

module.exports = mongoose.model('bulletin', BulletinSchema);
