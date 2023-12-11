const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');
// const Invitation = require('../../models/Invitation');
// const User = require('../../models/User');
// const AppUser = require('../../models/Appuser');

// function getRandomArbitrary(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

// const iterateSms = async (client, item, user_id) => {
//     let church_name = "";
//     await User.findOne({_id: user_id})
//         .then(data => church_name = data.church_name);
//     let tonumber = item.phone_number.trim();
//     let invitation_code = getRandomArbitrary(10000, 99999).toString();
//     console.log(tonumber);
//     let invitation = new Invitation({
//         code: invitation_code,
//         number: tonumber,
//         user_id,
//     })

//     await invitation.save();
//     client.messages
//     .create({
//         body: `You're invited to St. Paul! To register for our bulletin, Please register with this: /register/${invitation_code}`,
//         from: '+18886807267',
//         to: tonumber
        
//     })
//     .then(message => console.log(message)); 
// }

// @route    PUT api/bulletins
// @desc     Put New data to the Bulletin
// @access   Private
router.post('/new', async (req, res) => {
    const { bulletins, userId, access } = req.body;
    try {
        let flag = false;
        if(bulletins.bulletein_id){
            const result = await Bulletin.updateOne(
                { _id: bulletins.bulletein_id },
                {
                    header_date: bulletins.header_date,
                    header_imageurl: bulletins.header_imageurl,
                    header_title: bulletins.header_title,
                    todoList: bulletins.todoList,
                    number: bulletins.number,
                }
            );
            if (result.nModified === 1) {
                flag = true;
                res.status(200).send({ success: true });
            }
        }
        if (!flag) {
            const bulletin = new Bulletin({
                user_id: userId,
                header_date: bulletins.header_date,
                header_imageurl: bulletins.header_imageurl,
                header_title: bulletins.header_title,
                todoList: bulletins.todoList,
                number: bulletins.number,
            });

            const saveResult = await bulletin.save();

            if (saveResult) {
                res.status(200).send({ success: true });
            }
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// @route    DELETE api/bulletins
// @desc     Delete Bulletin
// @access   Private
router.post('/del', async (req, res) => {
    try {
        const { user_id } = req.body;

        const deletedBulletin = await Bulletin.findOneAndDelete({ _id: user_id });
        const data = await Bulletin.find({});
        
        res.status(200).send({ data });
    } catch (err) {
        console.error(err);
        res.status(404).send({ err });
    }
});

// @route    POST api/bulletins/retrieve
// @desc     Get All available bulletins
// @access   Private 
router.post('/retrieve', async (req, res) => {
    try {
        const { userid, access } = req.body;
        const bulletin = await Bulletin.find({ user_id: userid});

        if (bulletin) {
            res.status(200).send(bulletin);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});

// router.post('/sms', async (req, res) => {
//     console.log(req.body);
//     const {number, user_id} = req.body.number;
//     const config = require('config');
//     const accountSid = config.get('TWILIO_ACCOUNT_SID');
//     const authToken = config.get('TWILIO_AUTH_TOKEN');
//     const client = require('twilio')(accountSid, authToken);
//     number.forEach(item => {
//         iterateSms(client, item, user_id);
//     });
//     res.status(200).send({success: true});
// });

// router.post('/invitation', async (req, res) => {
//     const {number, church_name, id, userId} = req.body;
//     const config = require('config');
//     const accountSid = config.get('TWILIO_ACCOUNT_SID');
//     const authToken = config.get('TWILIO_AUTH_TOKEN');
//     const client = require('twilio')(accountSid, authToken);
//     // client.messages
//     // .create({
//     //     body: `You're invited to ${church_name}! To register for our bulletin, Please register with this: /confirm/${userId}^id`,
//     //     from: '+18886807267',
//     //     to: number
        
//     // })
//     // .then(message => console.log(message));
//     res.status(200).send({success: true});
// });

// router.post('/invite_accept', async (req, res) => {
//     const {appuser_id, user_id} = req.body;

//     console.log(appuser_id, user_id);
//     const result = await AppUser.updateOne(
//         {_id : appuser_id},
//         {$push: {invited: user_id}}
//     )
//     .then(data => console.log(data));

//     res.status(200).send({success: true})
// });

module.exports = router;
