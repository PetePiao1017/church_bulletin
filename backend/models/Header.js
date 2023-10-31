const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const HeaderSchema = new mongoose.Schema({
  header_title: {
    type: String,
  },
  header_date: {
    type: String,
  },
  header_imageurl: {
    type: String,
  },
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  }
});

module.exports = mongoose.model('header', HeaderSchema);
