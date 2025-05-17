const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

router.post('/', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password.' });
  }

  const filePath = path.join(__dirname, '..', 'data', 'user.json');

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'user.json file not found.' });
  }

  try {
    const fileData = fs.readFileSync(filePath, 'utf-8');
    const users = JSON.parse(fileData);
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.status(401).json({ error: 'Incorrect Username' });
    }

    if (user.setpassword !== password) {
      return res.status(401).json({ error: 'Incorrect Password' });
    }
    console.log('User login : ', user.fname,user.lname);
    return res.status(200).json({
      message: 'Login successful.',
      user: {
        fname: user.fname,
        lname: user.lname,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error during login.' });
  }
});

module.exports = router;
