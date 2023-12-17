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
  check('name', 'Full name is required').exists(),
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
        name,
        email, 
        password,
    } = req.body;


      try {
      let user = await User.findOne({ email });
      if (user) {
        return res
          .status(201)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = new User({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      user.password = await bcrypt.hash(password, salt);

      await user.save();

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

router.get('/all', async(req, res) => {
  User.find({})
    .then(data => {
      let tempArr = [];
      data.filter(item => item.email !== "camaj.robert@gmail.com")
        .forEach(item => {
          let tempObj = {
            id: item._id,
            editable: item.editableSections,
            name: item.name,
          }
          tempArr.push(tempObj);
        })
      res.status(200).send({data: tempArr});
    })
    .catch(err => res.status(201).send({msg: err}))
})


router.post('/permission', async(req, res) => {

  const {permission, email} = req.body;

  const result = await User.updateOne(
    {email},
    {
      admin: permission
    }
  );

  if(result.nModified == 1) {
    res.status(200).send({
      data: "success"
    })
  }
})

router.post('/sectionpermission', async(req, res) => {

  const {checked, userid, sectionid} = req.body;

  User.findOne({_id: userid})
    .then(user => {
      if(!user) {
        // User not found
        return res.status(404).send({msg: "User not found"})
      }

      else {
        const sectionIndex = user.editableSections.findIndex(section => section === sectionid);

        if(sectionIndex !== -1){
          user.editableSections[sectionIndex] = sectionid
        }
        else{
          user.editableSections.push(sectionid);
        }

        // Save the updated user document
        user.save((err, updatedUser) => {
          if (err) {
            console.error('Error updating user:', err);
            // Handle the error
            return res.status(500).send('Internal Server Error');
          }
          
          return res.status(200).send({data: "success"})
        });
      }
    })
  
})



module.exports = router;
