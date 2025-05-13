const express = require('express');
const router = express.Router();

router.post('/',(req,res) => {
    const {fname,lname,email,subject,massage} = req.body;
    console.log('Content form submited',{fname,lname,email,subject,massage});
    res.status(200).json({status : "Message Recieved"})
});
module.exports=router;