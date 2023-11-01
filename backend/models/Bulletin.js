const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BulletinSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },
  list_category: [
    {
      id :{
        type: String,
      },
      title: {
        type: String,
      },
      type: {
        type: String,
      }
    }
  ],
  header_title: {
    type: String,
  },
  header_date: {
    type: String,
  },
  header_imageurl: {
    type: String,
  },
});

module.exports = mongoose.model('bulletin', BulletinSchema);
