const express = require('express');
const path = require('path');
const app = express();

// Server staic files from current project folder
app.use(express.static(__dirname));

app.get('/',(req,res) => {
    res.sentfile(path.join(__dirname,"index.html"))
})

app.listen(3000, () =>{
    console.log("Server is running at http://localhost:3000")
})