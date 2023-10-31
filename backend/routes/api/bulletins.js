const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');
const Header = require('../../models/Header');
const Announcement = require('../../models/Announcement');


// @route    POST api/bulletin
// @desc     Save All Redux data 
// @access   Private
router.post('/', async (req, res) => {
    const {
        bulletein_id,
        header_title,
        header_date,
        header_imageurl,
        announcment_Title,
        announcment_bodyText,
        announcment_buttonLink,
        announcment_buttonText,
        announcment_imageurl,
    } = req.body;

    const header = new Header({
        bulletein_id,
        header_title,
        header_date,
        header_imageurl,
    });
    await header.save();
    
    console.log(Math.max(
        announcment_Title.length, 
        announcment_bodyText.length, announcment_buttonLink.length))
});


// @route    POST api/bulletin/new
// @desc     Put bulletinid to Bulletin model
// @access   Private
router.post('/new', async (req, res) => {
    
    const {userid} = req.body;

    const bulletin = new Bulletin({
        user_id: userid,
    })

    let result = await bulletin.save();

    
    if(result){
        res.status(200).send({bulletin_id: result._id});
    }
})


module.exports = router;