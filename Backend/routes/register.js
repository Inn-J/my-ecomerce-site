const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  try {
    const { fname, lname, occupation_cat, occupation, email, setpassword } = req.body;
    if (!fname || !lname || !occupation_cat || !occupation || !email || !setpassword) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const register = {
      registered: new Date().toISOString,
      fname,
      lname,
      occupation_cat,
      occupation,
      email,
      setpassword
    };
    const filePath = path.join(__dirname, '..', 'data', 'user.json');

    let registeredUsers = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf-8');
      try {
        registeredUsers = JSON.parse(fileData);
      } catch (err) {
        console.error('Error parsing user.json:', err);
        return res.status(500).json({ error: "Corrupted user data file." });
      }
      const duplicate = registeredUsers.find(user => user.email === email);
      if (duplicate) {
        return res.status(409).json({ error: "This email is already registered." });
      }
    }
    registeredUsers.push(register);
    try {
      fs.writeFileSync(filePath, JSON.stringify(registeredUsers, null, 2));
      console.log('Registration successful:', register);
      return res.status(200).json({ status: "Registration successful." });
    } catch (err) {
      console.error('Error writing user.json:', err);
      return res.status(500).json({ error: "Error saving user data." });
    }
  } catch (err) {
    console.error('Unexpected error:', err);
    return res.status(500).json({ error: "Server error." });
  }
});
module.exports = router;
