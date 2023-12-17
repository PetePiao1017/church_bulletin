const express = require('express');
const router = express.Router();
const multer = require('multer');

const Bulletin = require('../../models/Bulletin');
const Color = require('../../models/Color');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'img_uploads/'); // The directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique file name
    },
  });

const upload = multer({ storage: storage })


// @route    PUT api/bulletins
// @desc     Put New data to the Bulletin
// @access   Private
router.post('/new', async (req, res) => {
    const { bulletins, userId } = req.body;
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
router.get('/retrieve', async (req, res) => {
    try {
        const bulletin = await Bulletin.find({});

        if (bulletin) {
            res.status(200).send(bulletin);
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


router.post('/color/del', async (req, res) => {
    try{
        const { name } = req.body;

        console.log(name);
        Color.findOneAndDelete({name: name})
            .then(data => res.status(200).send({data: "success"}))
    
    }
    catch(err){
        res.status(500).send({msg: err})
    }

})


router.get('/color', async (req, res) => {
    try{
        await Color.find({})
            .then(data => res.status(200).send({data}))
            .catch(err => res.status(500).send({msg: err}))
    }
    catch(err){
        res.status(500).send({msg: err})
    }
})


router.post('/color', 
    upload.fields([
        {name: 'themename'}, 
        {name: 'title'}, 
        {name: 'section_title'}, 
        {name: 'background'}, 
        {name: 'sectionbackground'}
    ]), 
    async (req, res) => {
        try {
            const { themename, title, section_title } = req.body;
                
            let backgroundFileName;
            let sectionbackgroundFileName;
            let background;
            let sectionbackground;
        
            const backgronudFileArray = req.files['background'];
            const sectionbackgroundFileArray = req.files['sectionbackground'];
        
            if (backgronudFileArray) {
                console.log(backgronudFileArray[0]);
                backgroundFileName = backgronudFileArray[0].filename;
            } else {
                background = req.body.background;
            }
        
            if (sectionbackgroundFileArray) {
                sectionbackgroundFileName = sectionbackgroundFileArray[0].filename;
            } else {
                sectionbackground = req.body.sectionbackground;
            }

            let color = new Color({
                name: themename ,
                title,
                section_title,
                background: backgroundFileName ? backgroundFileName : background,
                section_background: sectionbackgroundFileName ? sectionbackgroundFileName : sectionbackground
            })

            await color.save();

            // Fetch data after saving the color
            const savedData = await Color.find({});

            res.status(200).send({ data: savedData });
        
        } catch (error) {
            console.error('Error:', error.message);
            res.status(400).send(error.message);
        }
        
    });




module.exports = router;
