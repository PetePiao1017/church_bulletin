const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const AppUser = require('../../models/Appuser');
const User = require('../../models/User');

// @route    POST /signup
// @desc     Register User
// @access   Public

router.post('/signup',
    async (req, res) => {
        const {email, password} = req.body;
        try{
            let user = await AppUser.findOne({email});

            if(user) {
                return res.status(201).send({errors: "User already exists"})
            }

            else{
                const payload = {email};
                let app_user = new AppUser({
                    email,
                    password,
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
        catch(err){
            res.status(201).send({errors: err})
        }
    }
);


// @route    POST /signin
// @desc     Login User
// @access   Public

router.post(
    '/signin',
    async (req, res) => {
      const { email, password } = req.body;
      const temp_arr = []
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
            let user = await User.find();
            user.map(item => {
                let tempObj = {
                    id: item._id,
                    name: item.church_name,
                }
                temp_arr.push(tempObj);
            })
            res.status(200).send({temp_arr});
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
      }
    }
);



module.exports = router;
