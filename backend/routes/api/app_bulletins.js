const express = require('express');
const router = express.Router();

const Bulletin = require('../../models/Bulletin');
const User = require('../../models/User');

// @route    POST /
// @desc     Get Bulletins
// @access   Public

const calculateDatedifference = (date, today) => {
    const dateObj = new Date(date);
    const todayObj = new Date(today);

    return todayObj.getDate() - dateObj.getDate();
}

router.post('/',
    async (req, res) => {
        // This id is church user id
        const {id} = req.body;
        try{
            User.find({_id: id})
                .then(data => {
                    if (!data[0].public) {
                        private = true;
                        res.status(200).send({private: true});
                    } else {
                        // Only if private is false, proceed to the next block
                        Bulletin.find({user_id: id})
                            .then(data => {
                                const today = new Date().toISOString().split('T')[0];
                                let index = -1;
                                let temp = 1000;

                                for (let i = 0; i < data.length; i++) {
                                    if (data[i].header_date < today) {
                                        let difference = calculateDatedifference(data[i].header_date, today);
                                        if (difference < temp) {
                                            temp = difference;
                                            index = i;
                                        }
                                    } 
                                }
                                res.status(200).send({active: data[index]});
                            })
                            .catch(err => {
                                console.log("err", err);
                                res.status(500).send({error: 'Internal Server Error'});
                            });
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).send({error: 'Internal Server Error'});
                });

        }
        catch(err){
            res.status(201).send({errors: err})
        }
    }
);

router.post('/all', async (req, res) => {
    let temp_arr = [];
    let user = await User.find();
    user.map(item => {
        let tempObj = {
            id: item._id,
            name: item.church_name,
        }
        temp_arr.push(tempObj);
    });
    console.log(temp_arr);
    res.status(200).send({temp_arr});
})


module.exports = router;
