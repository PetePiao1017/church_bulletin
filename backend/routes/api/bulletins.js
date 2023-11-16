const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');

// @route    POST api/bulletin/new
// @desc     Put New data to the Bulletin
// @access   Private
router.post('/new', async (req, res) => {
    
    const {bulletins, userId} = req.body;
    const bulletin = new Bulletin(
        {
            user_id: userId,
            header_date: bulletins.header_date,
            header_imageurl: bulletins.header_imageurl,
            header_title: bulletins.header_title,
            todoList: bulletins.todoList,
        }
    );

    let result = await bulletin.save();

    
    if(result){
        res.status(200).send({success: true});
    }
})

// @route    POST api/bulletin/retrieve
// @desc     Get All available bulletins
// @access   Private

router.post('/retrieve', async (req, res) => {
    try{
        const {userid} = req.body;
        const bulletin = await Bulletin.find({user_id : userid});
    
        if(bulletin){
            console.log("bulletin", bulletin)
            res.status(200).send(bulletin);
        }
    }
    catch(err) {
        res.status(201).send(err)
    }
    
})


module.exports = router;