const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');

// @route    PUT api/bulletins
// @desc     Put New data to the Bulletin
// @access   Private
router.post('/new', async (req, res) => {
    
    const {bulletins, userId} = req.body;
    let flag = false;
    await Bulletin
        .updateOne({_id : bulletins.bulletein_id}, {
            eader_date: bulletins.header_date,
            header_imageurl: bulletins.header_imageurl,
            header_title: bulletins.header_title,
            todoList: bulletins.todoList,
        })
        .then(result => {
            result.nModified == 1 ? flag = true : false;
            res.status(200).send({success: true});
        })
        .catch(err => console.log(err))
    if(!flag) {
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
    }
})

// @route    DELETE api/bulletins
// @desc     Delete Bulletin
// @access   Private
router.post('/del', async (req, res) => {
    try{
        const {user_id} = req.body;

        const deletedBulletin = await Bulletin.findOneAndDelete({_id: user_id})
        Bulletin.find({}).then(data => res.status(200).send({data})).catch(err => console.log(err))
    }
    catch(err){
        res.status(404).send({err})
    }
})


// @route    POST api/bulletins/retrieve
// @desc     Get All available bulletins
// @access   Private

router.post('/retrieve', async (req, res) => {
    try{
        const {userid} = req.body;
        const bulletin = await Bulletin.find({user_id : userid});
    
        if(bulletin){
            res.status(200).send(bulletin);
        }
    }
    catch(err) {
        res.status(201).send(err)
    }
    
})


module.exports = router;