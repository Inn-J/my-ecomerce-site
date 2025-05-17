const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
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

module.exports = router;
