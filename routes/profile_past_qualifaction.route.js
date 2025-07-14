const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const ProfilePastQualification = require('../models/profile_past_qualifaction.model');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/', upload.single('hostellar_certi'), async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const existing = await ProfilePastQualification.findOne({ student_hostel_id: req.body.student_hostel_id });
    if (existing) {
      return res.json({ success: false, message: 'Student Hostel ID already exists' });
    }

    const newEntry = new ProfilePastQualification({
      applicationNumber: req.session.user.applicationNumber,
      post_category: req.body.post_category,
      hosteller_hostel_type: req.body.hosteller_hostel_type,
      hosteller_house_name: req.body.hosteller_house_name,
      hosteller_hostel_address: req.body.hosteller_hostel_address,
      student_hostel_id: req.body.student_hostel_id,
      hostel_date: req.body.hostel_date,
      hostel_mess: req.body.hostel_mess,
      hostel_rent_month: req.body.hostel_rent_month,
      hostellar_certi: req.file ? req.file.filename : null,
      hosteller_pincode: req.body.hosteller_pincode
    });

    await newEntry.save();
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.json({ success: false, message: 'Server Error' });
  }
});

module.exports = router;
