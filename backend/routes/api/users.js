const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post(
  '/',
  check('firstname', 'FirstName is required').exists(),
  check('lastname', 'LastName is required').exists(),
  check('church_name', 'Church Name is required').exists(),
  check('church_url', 'URL is required').exists(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(201).json({ errors: errors.array() });
    }

    const { 
        church_name, 
        church_url,
        firstname,
        lastname,
        email, 
        password 
    } = req.body;

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        church_name,
        church_url,
        firstname,
        lastname,
        email,
        password
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: '5 days' },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
