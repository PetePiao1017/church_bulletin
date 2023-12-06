const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Invitation = require('../../models/Invitation');
const AppUser = require('../../models/Appuser');

// Save invitation code
const invitation = async (data, new_invited,invited, email,password) => {
    console.log(data);
    if(data){
      invited = [...data.invited, new_invited];
      await AppUser.updateOne({email}, {invited: invited});
    }
    else{
      const payload = {email};
      let app_user = new AppUser({
          email,
          password,
          invited: [new_invited],
      });
  
      const salt = await bcrypt.genSalt(10);
      app_user.password = await bcrypt.hash(password, salt);
  
      await app_user.save();
      jwt.sign(payload, config.get('jwtSecret'),{ expiresIn: '5 days' },
          (err, token) => {
              if (err) throw err;
              res.json({ token });
          }
      )
    }
}

router.post('/', async (req, res) => {
    const {email, password, id} = req.body;
    let new_invited = "";
    let flag = false;
  
    await Invitation.findOne({code: id})
      .then(data => {
        if(data == null) {
          res.status(201).send({result: "Not Verified User"});
          flag = true;
        }
        else{
          new_invited = data.user_id;
        }
      });
    
    if(!flag){
      let invited = [];
      await AppUser.findOne({email: email })
        .then(data => invitation(data, new_invited,invited, email,password))
    }
  })

module.exports = router;