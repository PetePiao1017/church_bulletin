const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AnnounccementSchema = new mongoose.Schema({
  announcement_title: {
    type: String,
  },
  announcement_imageurl: {
    type: String,
  },
  announcement_bodyText: {
    type: String,
  },
  announcement_buttonLink: {
    type: String,
  },
  announcement_buttonText: {
    type: String,
  },
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  },
  announcement_id :{
    type:String,
  }
});

module.exports = mongoose.model('announcement', AnnounccementSchema);
