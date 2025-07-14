const express = require('express');
const router = express.Router();
const ProfileAddress = require('../models/profile_address_information.model');

router.post('/profile_address_information', async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const newAddress = new ProfileAddress({
      ...req.body,
      applicationNumber: req.session.user.applicationNumber
    });

    await newAddress.save();

    res.send(`
      <script>
        alert("🎉 Address Information Saved Successfully!");
        window.location.href = "/profile_other_information.html";
      </script>
    `);
  } catch (error) {
    console.error("❌ Error saving address:", error);
    res.send(`
      <script>
        alert("⚠️ Failed to save address. Please try again.");
        window.history.back();
      </script>
    `);
  }
});

module.exports = router;
