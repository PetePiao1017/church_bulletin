const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const OrderofserviceSchema = new mongoose.Schema({
  orderofservice_title: {
    type: String,
  },
  orderofservice_imageurl: {
    type: String,
  },
  orderofservice_topic: [
    {type: String,}
  ],
  orderofservice_content: [
    {type: String,}
  ],
  bulletein_id :{
    type: Schema.Types.ObjectId,
    ref: "bulletin",
  },
  orderofservice_id :{
    type:String,
  }
});

module.exports = mongoose.model('orderofservice', OrderofserviceSchema);
