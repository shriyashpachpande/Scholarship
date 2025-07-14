const express = require('express');
const router = express.Router();

const Profile = require('../models/profile_perrsonal_information.model');
const Address = require('../models/profile_address_information.model');
const Other = require('../models/profile_other_information.model');
const Course = require('../models/profile_course.model');
const PastQual = require('../models/profile_past_qualifaction.model');
const Grievance = require('../models/grievance_suggestion.model');

router.get('/fetch_all_applications', async (req, res) => {
  try {
    const profiles = await Profile.find(); // Get all profiles

    const results = await Promise.all(profiles.map(async (profile) => {
      const appNum = profile.applicationNumber;

      const [address, other, course, past, grievance] = await Promise.all([
        Address.findOne({ applicationNumber: appNum }),
        Other.findOne({ applicationNumber: appNum }),
        Course.findOne({ applicationNumber: appNum }),
        PastQual.findOne({ applicationNumber: appNum }),
        Grievance.findOne({ applicationNumber: appNum }),
      ]);

      return {
        applicationNumber: appNum,
        personal: profile,
        address,
        other,
        course,
        past,
        grievance
      };
    }));

    res.json(results);
  } catch (err) {
    console.error("Error fetching data:", err);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
