const express = require('express');
const router = express.Router();
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'img_uploads/'); // The directory where uploaded files will be stored
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname); // Set a unique file name
    },
  });

const upload = multer({ storage: storage });

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        // Handle the case where no file was uploaded
        return res.status(400).send('No file uploaded.');
    }
    
    const fileName = req.file.filename;
    console.log('Uploaded file details:', fileName);

    // You can save the file details or perform further processing here

    res.status(200).send(fileName);
})


router.post('/del', (req, res) => {
  console.log(req.body)
  const imageUrl = req.body.imageUrl;
  let filePath = "img_uploads/" + imageUrl;
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error deleting the file");
    } 
    else {
      res.status(200).send("File deleted successfully");
    }
  });
})


module.exports = router