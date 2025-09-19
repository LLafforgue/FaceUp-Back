var express = require('express');
var router = express.Router();
const uniqid = require('uniqid');
const { checkBody } = require('../modules/checkBody');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

router.post('/upload', checkBody, async (req, res) => {
 const photoPath = `./tmp/${uniqid()}.jpg`;
 
//  Function components cannot be given refs
//envoi du fichier
 try{
   
     const resultMove = await req.files.photoFromFront.mv(photoPath);
        if(!resultMove) {

            try{
            const resultCloudinary = await cloudinary.uploader.upload(photoPath);
            fs.unlinkSync(photoPath);

            res.status(200).json({ result: true, url: resultCloudinary.secure_url });
            }catch(err){
                console.log(err)
                res.status(500).json({result:false, message:'cloudinary failed'})
            };   

        } else {
        res.json({ result: false, error: resultMove });
        };
 }catch(err){
    console.error(err)
    res.status(500).json({result:false})
 }
});


module.exports = router;
