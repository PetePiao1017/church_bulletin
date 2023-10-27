const mongoose = require('mongoose');

const BulletinSchema = new mongoose.Schema({
  user_id: {
    type: Schema.Types.ObjectId, 
    ref: "user"
  }
  
});

module.exports = mongoose.model('user', UserSchema);
