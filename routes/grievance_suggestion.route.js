const express = require('express');
const router = express.Router();
const GrievanceSuggestion = require('../models/grievance_suggestion.model');

router.post('/submit_grievance', async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const data = new GrievanceSuggestion({
      applicationNumber: req.session.user.applicationNumber,
      fname: req.body.Fname,
      middlename: req.body.middlename,
      lastname: req.body["Last Name"],
      gmail: req.body.gmail,
      district: req.body.district,
      pincode: req.body.pincode,
      department: req.body.department,
      scheme: req.body.scheme,
      category: req.body.category,
      academic: req.body.academic
    });

    await data.save();
    res.send(`<script>alert("Grievance/Suggestion submitted successfully!"); window.location.href='/index.html';</script>`);
  } catch (err) {
    console.error(err);
    res.send(`<script>alert("Error saving data. Please try again."); window.history.back();</script>`);
  }
});

module.exports = router;
