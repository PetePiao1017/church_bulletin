const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const EventSchema = new mongoose.Schema({
  event_title: {
    type: String,
  },
  event_imageurl: {
    type: String,
  },
  event_bodyText: {
    type: String,
  },
  event_btnLink: {
    type: String,
  },
  event_btnText: {
    type: String,
  },
  event_location: {
    type: String,
  },
  event_date: {
    type: String,
  },
  event_time_start: {
    type: String,
  },
  event_time_end: {
    type: String,
  },
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  },
  event_id :{
    type:String,
  }
});

module.exports = mongoose.model('event', EventSchema);
