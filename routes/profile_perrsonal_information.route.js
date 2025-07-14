const express = require('express');
const multer = require('multer');
const router = express.Router();
const Profile = require('../models/profile_perrsonal_information.model');

// File upload config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Handle form POST
router.post('/submit_personal_profile', upload.fields([
  { name: 'filename', maxCount: 2 }
]), async (req, res) => {
  if (!req.session.user) {
    return res.send(`<script>alert("Please log in first."); window.location.href='/login_form.html';</script>`);
  }

  try {
    const {
      aadhar_no,
      paraent_mobile_number,
      bank_account_number,
      ifscode
    } = req.body;

    // Check for duplicates
    const duplicateFields = [];

    const [
      checkAadhar,
      checkParentMobile,
      checkBankAccount,
      checkIfsc
    ] = await Promise.all([
      Profile.findOne({ aadhar_no }),
      Profile.findOne({ paraent_mobile_number }),
      Profile.findOne({ bank_account_number }),
      Profile.findOne({ ifscode })
    ]);

    if (checkAadhar) duplicateFields.push("Aadhar Number");
    if (checkParentMobile) duplicateFields.push("Parent's Mobile Number");
    if (checkBankAccount) duplicateFields.push("Bank Account Number");
    if (checkIfsc) duplicateFields.push("IFSC Code");

    if (duplicateFields.length > 0) {
      return res.send(`<script>alert("Duplicate found in: ${duplicateFields.join(', ')}"); window.history.back();</script>`);
    }

    // Save the profile with applicationNumber
    const newProfile = new Profile({
      applicationNumber: req.session.user.applicationNumber,
      aadhar_no,
      dateofbir: req.body.dateofbir,
      age: req.body.age,
      paraent_mobile_number,
      Full_name_as_per_aadhar_card: req.body.Full_name_as_per_aadhar_card,
      Marital_Status: req.body.Marital_Status,
      religion: req.body.religion,
      cast_category: req.body.cast_category,
      cast_certifacte: req.body.cast_certifacte,
      cast_certifacte_file: req.files.filename?.[0]?.filename || '',
      annual_income: req.body.annual_income,
      income_certificate: req.body.family_annual_income,
      income_certificate_file: req.files.filename?.[1]?.filename || '',
      salaried: req.body.salaried || '',
      disability: req.body.disability || '',
      bank_account_number,
      ifscode,
      bank_branch: req.body.bank_branch
    });

    await newProfile.save();
    res.send(`<script>alert("Profile saved successfully."); window.location.href = "/profile_address_information.html";</script>`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`<script>alert("Server Error"); window.history.back();</script>`);
  }
});

module.exports = router;
