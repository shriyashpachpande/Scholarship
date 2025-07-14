const express = require('express');
const router = express.Router();
const ProfileOtherInformation = require('../models/profile_other_information.model');

router.post('/profile_other_information', async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const {
      Guardian,
      full_FatherName,
      fatherOccupation,
      isFatherSalaried,
      Guardian1,
      full_motherName,
      motherOccupation,
      isMotherSalaried
    } = req.body;

    const profile = new ProfileOtherInformation({
      applicationNumber: req.session.user.applicationNumber,
      isFatherAlive: Guardian,
      full_FatherName,
      fatherOccupation,
      isFatherSalaried,
      isMotherAlive: Guardian1,
      full_motherName,
      motherOccupation,
      isMotherSalaried
    });

    await profile.save();

    res.send(`
      <script>
        alert("🎉 Other Information Saved Successfully!");
        window.location.href = "/profile_course.html";
      </script>
    `);
  } catch (err) {
    console.error("❌ Error saving other info:", err);
    res.send(`<script>alert("Failed to save. Please try again."); window.history.back();</script>`);
  }
});

module.exports = router;
