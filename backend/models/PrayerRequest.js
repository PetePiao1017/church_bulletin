const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PrayerRequestSchema = new mongoose.Schema({
  prayer_title: {
    type: String,
  },
  prayer_bodyText: {
    type: String,
  },
  prayer_checkedvalues: [
    {type: String,}
  ],
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  },
  prayer_id :{
    type:String,
  }
});

module.exports = mongoose.model('prayerrequest', PrayerRequestSchema);
