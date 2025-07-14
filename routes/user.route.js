const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

// Application Number Generator
function generateApplicationNumber(length = 10) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

// Register Route
router.post('/entry_registration', async (req, res) => {
  const data = req.body;

  if (data.password !== data.confirmPassword) {
    return res.send(`<script>alert("Passwords do not match!"); window.history.back();</script>`);
  }

  const duplicateFields = [];

  const [
    studentCheck,
    usernameCheck,
    emailCheck,
    phoneCheck
  ] = await Promise.all([
    User.findOne({ studentID: data.studentID }),
    User.findOne({ username: data.username }),
    User.findOne({ email: data.email }),
    User.findOne({ mobileNumber: data.mobileNumber })
  ]);

  if (studentCheck) duplicateFields.push("Student ID");
  if (usernameCheck) duplicateFields.push("Username");
  if (emailCheck) duplicateFields.push("Email");
  if (phoneCheck) duplicateFields.push("Mobile Number");

  if (duplicateFields.length > 0) {
    return res.send(`<script>alert("Duplicate found in: ${duplicateFields.join(', ')}"); window.history.back();</script>`);
  }

  // Generate unique application number
  let appNumber;
  let existingApp;

  do {
    appNumber = generateApplicationNumber();
    existingApp = await User.findOne({ applicationNumber: appNumber });
  } while (existingApp);

  const user = new User({
    ...data,
    applicationNumber: appNumber
  });

  await user.save();

  res.send(`<script>alert("User registered successfully!\\nYour Application Number: ${appNumber}"); window.location.href = "/login_form.html";</script>`);
});

// Login Route
router.post('/entry_login', async (req, res) => {
  const { username_login, password_login } = req.body;

  const user = await User.findOne({
    applicationNumber: username_login,
    password: password_login
  });

  if (user) {
    req.session.user = user;
    res.send(`<script>alert("Login successful!"); window.location.href = "/index.html";</script>`);
  } else {
    res.send(`<script>alert("Invalid Application Number or Password!"); window.history.back();</script>`);
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login_form.html');
});

module.exports = router;
