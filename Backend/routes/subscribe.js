const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path')
/* 
readfile
pharse in to array
add new data to array
save array into file
*/
router.post('/',(req,res) => {
    const {email} = req.body;
    const subscribe = {subscribe  : new Date(),email};
    const filePath = path.join(__dirname,'..','data','subscribe.json');
    console.log('Content form submited',{email});
    let subscribes = [];
    if(fs.existsSync(filePath) == true){
        const filedata = fs.readFileSync(filePath,'utf-8');
        subscribes = JSON.parse(filedata);
        subscribes.push(subscribe);
        fs.writeFileSync(filePath,JSON.stringify(subscribes,null,2));
        res.status(200).json({status : "Message Recieved"});

    }
    else{
        subscribes.push(subscribe);
        fs.writeFileSync(filePath,JSON.stringify(subscribes,null,2));
        res.status(200).json({status : "Message Recieved"});
    }    
});
module.exports=router;