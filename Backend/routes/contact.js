const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sqlite3 = require('sqlite3')
const dbPath = path.join(__dirname, '..','data','contact.db');
const db = new sqlite3.Database(dbPath);

db.run(`CREATE TABLE IF NOT EXISTS contact(
        id INTEGER PRIMARY KEY,
        fname TEXT,
        lname TEXT,
        email TEXT,
        subject TEXT,
        message TEXT)`)
router.post('/', (req, res) => {
    const {fname, lname, email, subject, message} = req.body;

    var sql = `INSERT INTO contact (
                    fname, 
                    lname, 
                    email, 
                    subject, 
                    message) VALUE ("+fname+","+lname+","+email+","+subject+","+message+")`;

    db.run('INSERT INTO contact (fname, lname, email, subject, message) VALUES (?,?,?,?,?)',
        [fname, lname, email, subject, message]);

    console.log('Content form summited', fname, lname, email, subject, message);
    res.status(200).json({status : 'Contact saved in database!!'})


});

router.get('/:action', (req, res) => {
    const {action} = req.params;
    switch (action){
        case 'all':
            var sql = "SELECT * FROM contact ORDER BY id DESC";
            db.all(sql,[], (err, rows) => {
                if(err){
                    return res.status(500).json({error: 'Fail to fecth contacts form DB!!!!!!!!!!'})
                }else{
                    return res.json(rows);
                }
            });
            break;

        case 'last':
            var sql = "SELECT * FROM contact WHERE id = (SELECT max(id) FROM contact)";
            db.all(sql,[], (err, rows) => {
                if(err){
                    return res.status(500).json({error: 'Fail to fecth contacts form db!!!!!!!!!!'})
                }
                res.json(rows);
            });
            break;

        case 'deleteLast':
        var sql = "DELETE FROM contact WHERE id = (SELECT max(id) FROM contact)";
            db.all(sql,[], (err, rows) => {
                if(err){
                    return res.status(500).json({error: 'Fail to fecth contacts form db!!!!!!!!!!'})
                }
                res.json({message:'Last contact is deleted from db'});
            })
            break;

        default:
            return res.status(500).json({error : 'action not found'})
            break;
    }
});
module.exports = router ;   

/*router.post('/', (req, res) => {
  try {
    const { fname, lname, email, subject, message } = req.body;
    if (!fname || !lname || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields." });
    }
    const contact = {
      receivedAt: new Date().toISOString(),
      fname,
      lname,
      email,
      subject,
      message
    };

    const filePath = path.join(__dirname, '..', 'data', 'contact.json');

    let contacts = [];

    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      try {
        contacts = JSON.parse(fileData);
      } catch (err) {
        console.error('Error parsing contact.json:', err);
        return res.status(500).json({ error: "Corrupted contact data file." });
      }
    }

    contacts.push(contact);
    try {
      fs.writeFileSync(filePath, JSON.stringify(contacts, null, 2), 'utf-8');
      console.log('Contact form saved:', contact);
      return res.status(200).json({ status: "Contact message received." });
    } catch (err) {
      console.error('Error writing contact.json:', err);
      return res.status(500).json({ error: "Error saving contact data." });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: "Server error." });
  }
});

module.exports = router;*/
