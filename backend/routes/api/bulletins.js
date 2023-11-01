const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');
const Header = require('../../models/Header');
const Announcement = require('../../models/Announcement');
const Orderofservice = require("../../models/Orderofservice");
const Event = require("../../models/Event");
const Connectcard = require("../../models/Connectcard");
const PrayerRequest = require("../../models/PrayerRequest");

const getMaximumLengthField = (arrayOfArrays) => {
    let maxLength = -1;
    let maxElementArray = null;

    for (const elementArray of arrayOfArrays){
        const currentLength = elementArray.length;
        if (currentLength > maxLength) {
            maxLength = currentLength; // Update the max length
            maxElementArray = elementArray; // Update the corresponding element array
        }
    }

    return maxElementArray
}


// @route    POST api/bulletin
// @desc     Save All Redux data 
// @access   Private
router.post('/', async (req, res) => {
    try{
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

            orderofservice_Title,
            orderofservice_Topic_Content,
            orderofservice_Topic_Title,
            orderofservice_imageurl,

            event_Title,
            event_bodyText,
            event_btnLink,
            event_btnText,
            event_imageurl,
            event_Date,
            event_Location,
            event_Time_End,
            event_Time_Start,

            connectcard_Title,
            connectcard_bodyText,
            connectcard_imageurl,
            connectcard_Question_One,
            connectcard_Question_Two,
            connectcard_Option_One,
            connectcard_Option_Two,
            connectcard_checkedvalues,

            prayer_Title,
            prayer_bodyText,
            prayer_checkedvalue,

        } = req.body.bulletins;
        
        const {localbulletins} = req.body;

        // Bulletin Save
        let bulletin = await Bulletin.findOne({_id : bulletein_id});
        if(bulletin){
            let filter = {_id : bulletein_id}
            let updateDoc = {
                $set : {
                    list_category: localbulletins,
                    header_title,
                    header_date,
                    header_imageurl,
                }
            }

            const result = await Bulletin.updateOne(filter, updateDoc);

            console.log("result", result);
        }

        
        // Announcement Save
        let announcement_tempArr = [
            announcment_Title, 
            announcment_bodyText, 
            announcment_buttonLink,
            announcment_buttonText,
            announcment_imageurl,
        ];
        
        let tempMaximumArr = getMaximumLengthField(announcement_tempArr);

        if(tempMaximumArr.length !== 0){
            tempMaximumArr.map(async (item, index) => {
                let title = announcment_Title.filter(element => element.id === item.id);
                let bodyText = announcment_bodyText.filter(element => element.id === item.id);
                let buttonLink = announcment_buttonLink.filter(element => element.id === item.id);
                let buttonText = announcment_buttonText.filter(element => element.id === item.id);
                let imageurl = announcment_imageurl.filter(element => element.id === item.id);
        
                
                let announcement = await Announcement.findOne({announcement_id : item.id});
                

                if(announcement) {
                    const filter = {announcement_id : item.id};
                    const updateDoc = {
                        $set: {
                            announcement_title: title.length !==0 ? title[0].str : null,
                            announcement_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                            announcement_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                            announcement_buttonLink: buttonLink.length !==0 ? buttonLink[0].str : null,
                            announcement_buttonText: buttonText.length !==0 ? buttonText[0].str : null,
                        }
                    }

                    const result = await Announcement.updateOne(filter, updateDoc);

                }
                
                else{
                    announcement = new Announcement({
                    announcement_id: item.id,
                    announcement_title: title.length !==0 ? title[0].str : null,
                    announcement_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                    announcement_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                    announcement_buttonLink: buttonLink.length !==0 ? buttonLink[0].str : null,
                    announcement_buttonText: buttonText.length !==0 ? buttonText[0].str : null,
                    bulletein_id: bulletein_id,
                    });
                    let res = await announcement.save();
                }
        
            })
        }
       
        // Order Of Service save

        let orderOfService_tempArr = [
            orderofservice_Title,
            orderofservice_Topic_Content,
            orderofservice_Topic_Title,
            orderofservice_imageurl,
        ];

        tempMaximumArr = getMaximumLengthField(orderOfService_tempArr);

        if(tempMaximumArr.length !== 0) {
            tempMaximumArr.map(async (item, index) => {
                let title = orderofservice_Title.filter(element => element.id === item.id);
                let topic_title = orderofservice_Topic_Title.filter(element => element.id === item.id);
                let topic_content = orderofservice_Topic_Content.filter(element => element.id === item.id);
                let imageurl = orderofservice_imageurl.filter(element => element.id === item.id);
                
                let orderofservice = await Orderofservice.findOne(
                    {orderofservice_id : item.id});

                if(orderofservice) {
                    const filter = {orderofservice_id : item.id};
                    const updateDoc = {
                        $set: {
                            orderofservice_title: title.length !==0 ? title[0].str : null,
                            orderofservice_topic: topic_title.length !==0 ? topic_title[0].str : null,
                            orderofservice_content: topic_content.length !==0 ? topic_content[0].str : null,
                            orderofservice_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                        }
                    }

                    const result = await Orderofservice.updateOne(filter, updateDoc);

                }
                
                else{
                    orderofservice = new Orderofservice({
                        orderofservice_id: item.id,
                        orderofservice_title: title.length !==0 ? title[0].str : null,
                        orderofservice_topic: topic_title.length !==0 ? topic_title[0].str : null,
                        orderofservice_content: topic_content.length !==0 ? topic_content[0].str : null,
                        orderofservice_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                        bulletein_id: bulletein_id,
                    });

                    let res = await orderofservice.save();
                }
        
            })
        }

        // Event Save

        let event_tempArr = [
            event_Title,
            event_bodyText,
            event_btnLink,
            event_btnText,
            event_imageurl,
            event_Date,
            event_Location,
            event_Time_End,
            event_Time_Start,
        ]

        tempMaximumArr = getMaximumLengthField(event_tempArr);

        if (tempMaximumArr.length !== 0) {
            if(tempMaximumArr.length !== 0) {
                tempMaximumArr.map(async (item, index) => {
                    let title = event_Title.filter(element => element.id === item.id);
                    let bodyText = event_bodyText.filter(element => element.id === item.id);
                    let btnLink = event_btnLink.filter(element => element.id === item.id);
                    let btnText = event_btnText.filter(element => element.id === item.id);
                    let imageurl = event_imageurl.filter(element => element.id === item.id);
                    let date = event_Date.filter(element => element.id === item.id);
                    let time_start = event_Time_Start.filter(element => element.id === item.id);
                    let time_end = event_Time_End.filter(element => element.id === item.id);
                    let location = event_Location.filter(element => element.id === item.id);
                    
                    let event = await Event.findOne(
                        {event_id : item.id});
    
                    if(event) {
                        const filter = {event_id : item.id};
                        const updateDoc = {
                            $set: {
                                event_title: title.length !==0 ? title[0].str : null,
                                event_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                                event_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                                event_btnLink: btnLink.length !==0 ? btnLink[0].str : null,
                                event_btnText: btnText.length !==0 ? btnText[0].str : null,
                                event_location: location.length !==0 ? location[0].str : null,
                                event_date: date.length !==0 ? date[0].str : null,
                                event_time_start: time_start.length !==0 ? time_start[0].str : null,
                                event_time_end: time_end.length !==0 ? time_end[0].str : null,
                            }
                        }
    
                        const result = await Event.updateOne(filter, updateDoc);
    
                    }
                    
                    else{
                        event = new Event({
                            event_id: item.id,
                            event_title: title.length !==0 ? title[0].str : null,
                            event_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                            event_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                            event_btnLink: btnLink.length !==0 ? btnLink[0].str : null,
                            event_btnText: btnText.length !==0 ? btnText[0].str : null,
                            event_location: location.length !==0 ? location[0].str : null,
                            event_date: date.length !==0 ? date[0].str : null,
                            event_time_start: time_start.length !==0 ? time_start[0].str : null,
                            event_time_end: time_end.length !==0 ? time_end[0].str : null,
                            bulletein_id: bulletein_id,
                        });
    
                        let res = await event.save();
                    }
            
                })
            }
        }


        // Connect Card
        let connectcard_tempArr = [
            connectcard_Title,
            connectcard_bodyText,
            connectcard_imageurl,
            connectcard_Question_One,
            connectcard_Question_Two,
            connectcard_Option_One,
            connectcard_Option_Two,
            connectcard_checkedvalues,
        ]

        tempMaximumArr = getMaximumLengthField(connectcard_tempArr);

        if (tempMaximumArr.length !== 0) {
            if(tempMaximumArr.length !== 0) {
                tempMaximumArr.map(async (item, index) => {
                    let title = connectcard_Title.filter(element => element.id === item.id);
                    let bodyText = connectcard_bodyText.filter(element => element.id === item.id);
                    let questionone = connectcard_Question_One.filter(element => element.id === item.id);
                    let questiontwo = connectcard_Question_Two.filter(element => element.id === item.id);
                    let imageurl = connectcard_imageurl.filter(element => element.id === item.id);
                    let optionone = connectcard_Option_One.filter(element => element.id === item.id);
                    let optiontwo = connectcard_Option_Two.filter(element => element.id === item.id);
                    let checkedvalues = connectcard_checkedvalues.filter(element => element.id === item.id);
                    
                    let connectcard = await Connectcard.findOne(
                        {connectcard_id : item.id});
    
                    if(connectcard) {
                        const filter = {connectcard_id : item.id};
                        const updateDoc = {
                            $set: {
                                connectcard_title: title.length !==0 ? title[0].str : null,
                                connectcard_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                                connectcard_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                                connectcard_questionone: questionone.length !==0 ? questionone[0].str : null,
                                connectcard_questiontwo: questiontwo.length !==0 ? questiontwo[0].str : null,
                                connectcard_optionone: optionone.length !==0 ? optionone[0].str : null,
                                connectcard_optiontwo: optiontwo.length !==0 ? optiontwo[0].str : null,
                                connectcard_checkedvalues: checkedvalues.length !==0 ? checkedvalues[0].str : null,
                            }
                        }
    
                        const result = await Connectcard.updateOne(filter, updateDoc);
    
                    }
                    
                    else{
                        connectcard = new Connectcard({
                            connectcard_id: item.id,
                            connectcard_title: title.length !==0 ? title[0].str : null,
                            connectcard_imageurl: imageurl.length !==0 ? imageurl[0].str : null,
                            connectcard_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                            connectcard_questionone: questionone.length !==0 ? questionone[0].str : null,
                            connectcard_questiontwo: questiontwo.length !==0 ? questiontwo[0].str : null,
                            connectcard_optionone: optionone.length !==0 ? optionone[0].str : null,
                            connectcard_optiontwo: optiontwo.length !==0 ? optiontwo[0].str : null,
                            connectcard_checkedvalues: checkedvalues.length !==0 ? checkedvalues[0].str : null,
                            bulletein_id: bulletein_id,
                        });
    
                        let res = await connectcard.save();
                    }
            
                })
            }
        }

        // Prayer Request

        let prayer_tempArr = [
            prayer_Title,
            prayer_bodyText,
            prayer_checkedvalue,
        ];

        tempMaximumArr = getMaximumLengthField(prayer_tempArr);

        if (tempMaximumArr.length !== 0) {
            if(tempMaximumArr.length !== 0) {
                tempMaximumArr.map(async (item, index) => {
                    let title = prayer_Title.filter(element => element.id === item.id);
                    let bodyText = prayer_bodyText.filter(element => element.id === item.id);
                    let checkedvalues = prayer_checkedvalue.filter(element => element.id === item.id);
                    
                    let prayer = await PrayerRequest.findOne(
                        {prayer_id : item.id});
    
                    if(prayer) {
                        const filter = {prayer_id : item.id};
                        const updateDoc = {
                            $set: {
                                prayer_title: title.length !==0 ? title[0].str : null,
                                prayer_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                                prayer_checkedvalues: checkedvalues.length !==0 ? checkedvalues[0].str : null,
                            }
                        }
    
                        const result = await PrayerRequest.updateOne(filter, updateDoc);
                        console.log("result", result)
                    }
                    
                    else{
                        prayer = new PrayerRequest({
                            prayer_id: item.id,
                            prayer_title: title.length !==0 ? title[0].str : null,
                            prayer_bodyText: bodyText.length !==0 ? bodyText[0].str : null,
                            prayer_checkedvalues: checkedvalues.length !==0 ? checkedvalues[0].str : null,
                            bulletein_id: bulletein_id,
                        });
    
                        let res = await prayer.save();
                    }
            
                })
            }
        }

        res.status(200).send("OK");
    }
    catch{
        (err) => res.status(201).send(err);
    }


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

// @route    POST api/bulletin/retrieve
// @desc     Get All available bulletins
// @access   Private

router.post('/retrieve', async (req, res) => {
    try{
        const {userid} = req.body;
        const bulletin = await Bulletin.find({user_id : userid});
    
        if(bulletin){
            console.log(bulletin)
            res.status(200).send(bulletin);
        }
        else{
            res.status(200).send("Empty");
        }
    }
    catch(err) {
        res.status(201).send(err)
    }
    
})


module.exports = router;