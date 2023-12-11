const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');
const AppUser = require('../../models/Appuser');

// @route    GET api/auth
// @desc     Get user by token
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});


// @route    GET api/auth/all
// @desc     Get All usre data
// @access   Private
router.get('/all', auth, async (req, res) => {
  try {
    if(req.verified === "admin") {
      await User.find({})
        .then(data => {
          let result = data.filter(item => item.email !== "camaj.robert@gmail.com")
          res.status(200).send(result);
        })
    }
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  check('password', 'Password is required').exists(),
  check('email', 'Email is required').exists(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(201).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

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

      const payload = {
        user: {
          id: user.id
        }
      };

      if(email === "camaj.robert@gmail.com"){
        jwt.sign(
          payload,
          config.get('adminSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token, user });
          }
        );
      }
      else{
        jwt.sign(
          payload,
          config.get('systemSecret'),
          { expiresIn: '5 days' },
          (err, token) => {
            if (err) throw err;
            res.json({ token, user });
          }
        );
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

router.get('/app', async (req, res) => {
  try {
    const data = await AppUser.find().select('-password -date');

    res.status(200).send({data});
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

router.post('/status', async (req, res) => {
  try{
    const {status, email} = req.body;
    const result = await User.updateOne(
        {email},
        {status}
      )
      .then(data => {
        if(data.nModified == 1){
          res.status(200).send({success: "OK"})
        }
      })
  } catch(err) {

  }
})


module.exports = router;
