const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const AppUser = require('../../models/Appuser');
const User = require('../../models/User');


// @route    POST /signin
// @desc     Login User
// @access   Public

router.post(
    '/signin',
    async (req, res) => {
      const { email, password } = req.body;
      let public = [];
      let private = [];
      try {
        let user = await AppUser.findOne({ email });
  
        if (!user) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        const isMatch = await bcrypt.compare(password, user.password);
  
        if (!isMatch) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'Invalid Credentials' }] });
        }
        else{
            let admin_user = await User.find();
            admin_user.map(item => {
                let tempObj = {
                    id: item._id,
                    name: item.church_name,
                }
                public.push(tempObj);
                let index = user.invited.indexOf(item._id);
                if(index !== -1){
                  private.push(tempObj);
                }
            });
            console.log(public);
            console.log(private);
            res.status(200).send({public, private});
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);

router.post(
    '/signup',
    async (req, res) => {
      const { name, email, phonenumber, password } = req.body;
      try {
        let user = await AppUser.findOne({ email });
  
        if (user) {
          return res
            .status(201)
            .json({ errors: [{ msg: 'User has already exists' }] });
        }
        
        user = new AppUser({
          fullname: name,
          email,
          phonenumber,
          password,
        })

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).send({success: true});
        
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);



module.exports = router;
