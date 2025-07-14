const express = require('express');
const router = express.Router();
const Institute = require('../models/institue_dept_regisiter.model');

router.post('/register_institute', async (req, res) => {
  const { Institue_Code, College_Name, Institue_Username, mobileNumber, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res.send('<script>alert("Passwords do not match!"); window.history.back();</script>');
  }

  try {
    const existing = await Institute.findOne({
      $or: [
        { Institue_Code },
        { Institue_Username },
        { mobileNumber },
        { email }
      ]
    });

    if (existing) {
      return res.send('<script>alert("Institute with same Code, Username, Mobile, or Email already exists."); window.history.back();</script>');
    }

    const newInstitute = new Institute({
      Institue_Code,
      College_Name,
      Institue_Username,
      mobileNumber,
      email,
      password
    });

    await newInstitute.save();
    res.send(`<script>alert("New Institute Register Successfully"); window.location.href = "/SCHOLARSHIP.html";</script>`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});


// Institute Login
router.post('/institute_login', async (req, res) => {
  const { institute_code_login, password_login } = req.body;

  try {
    const institute = await Institute.findOne({
      Institue_Code: institute_code_login,
      password: password_login
    });

    if (institute) {
      req.session.institute = institute;
      return res.send(`<script>alert("Institute Login successful!"); window.location.href = "/institute_dashboard.html";</script>`);
    } else {
      return res.send(`<script>alert("Invalid Institute Code or Password!"); window.history.back();</script>`);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
