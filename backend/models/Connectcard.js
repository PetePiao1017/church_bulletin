const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ConnectCardSchema = new mongoose.Schema({
  connectcard_title: {
    type: String,
  },
  connectcard_imageurl: {
    type: String,
  },
  connectcard_bodyText: {
    type: String,
  },
  connectcard_questionone: {
    type: String,
  },
  connectcard_questiontwo: {
    type: String,
  },
  connectcard_optionone:[
    {type: String,}
  ],
  connectcard_optiontwo:[
    {type: String,}
  ],
  connectcard_checkedvalues: [
    {type: String,}
  ],
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  },
  connectcard_id :{
    type:String,
  }
});

module.exports = mongoose.model('connectcard', ConnectCardSchema);
