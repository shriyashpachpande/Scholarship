const express = require('express');
const router = express.Router();
const multer = require('multer');
const ProfileCourse = require('../models/profile_course.model');

// Setup Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage: storage });

router.post('/save_profile_course', upload.fields([
  { name: 'CET/MERIT', maxCount: 1 },
  { name: 'course_upload_marksheet', maxCount: 1 }
]), async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const { course_admit_id } = req.body;

    const existing = await ProfileCourse.findOne({ course_admit_id });
    if (existing) {
      return res.send('<script>alert("This Admission ID already exists."); window.history.back();</script>');
    }

    const newCourse = new ProfileCourse({
      ...req.body,
      applicationNumber: req.session.user.applicationNumber,
      CET_MERIT: req.files['CET/MERIT']?.[0]?.filename || '',
      course_upload_marksheet: req.files['course_upload_marksheet']?.[0]?.filename || ''
    });

    await newCourse.save();
    return res.send('<script>alert("Course information saved successfully!"); window.location.href="profile_past_qualifaction.html";</script>');

  } catch (error) {
    console.error(error);
    return res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
