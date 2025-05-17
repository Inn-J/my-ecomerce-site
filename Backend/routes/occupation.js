const express = require('express');
const router = express.Router();
const occupationcat = require('../../json/occupation-cat.json')
router.get('/',(req,res) => {
    res.json(occupationcat);
});
module.exports = router;