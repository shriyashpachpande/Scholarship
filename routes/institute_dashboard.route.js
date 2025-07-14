const express = require('express');
const router = express.Router();

const ProfilePersonalInfo = require('../models/profile_perrsonal_information.model');
const ProfileAddressInfo = require('../models/profile_address_information.model');
const ProfileOtherInfo = require('../models/profile_other_information.model');
const ProfileCourse = require('../models/profile_course.model');
const ProfilePast = require('../models/profile_past_qualifaction.model');
const Grievance = require('../models/grievance_suggestion.model');

// GET: Fetch all applicant data
router.get('/fetch_all_applicants', async (req, res) => {
  try {
    const personals = await ProfilePersonalInfo.find();

    const results = await Promise.all(personals.map(async (p) => {
      const applicationNumber = p.applicationNumber;
      const [address, other, course, past, grievance] = await Promise.all([
        ProfileAddressInfo.findOne({ applicationNumber }),
        ProfileOtherInfo.findOne({ applicationNumber }),
        ProfileCourse.findOne({ applicationNumber }),
        ProfilePast.findOne({ applicationNumber }),
        Grievance.findOne({ applicationNumber })
      ]);

      return {
        personal: p,
        address,
        other,
        course,
        past,
        grievance
      };
    }));

    res.json(results);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
