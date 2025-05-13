const express = require('express');
const router = express.Router();
const subject = require('../Data/contact_subject.json')

router.get('/',(req,res) => {
    res.end('{"contactSubject": ["General Enqury","Class","Schedule","Instructer","Price","Auther","Location","Other"]}');
});
module.exports = router;
