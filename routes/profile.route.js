const express = require('express');
const path = require('path');
const UserProfile = require('../models/UserProfile');
const multer = require('multer');

const router = express.Router();

// Set up multer for file uploads (for caste certificate)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

// POST route to handle profile form submission
router.post('/submit', upload.single('cast_certifacte'), async (req, res) => {
    try {
        const {
            aadhar_no,
            dateofbir,
            age,
            paraent_mobile_number,
            Full_name_as_per_aadhar_card,
            Marital_Status,
            religion,
            cast_category
        } = req.body;

        const cast_certifacte = req.file ? req.file.filename : null;

        const newProfile = new UserProfile({
            aadhar_no,
            dateofbir,
            age,
            paraent_mobile_number,
            Full_name_as_per_aadhar_card,
            Marital_Status,
            religion,
            cast_category,
            cast_certifacte: cast_certifacte ? 'cast_certifacte-yes' : undefined
        });

        await newProfile.save();

        res.send('Profile Information Saved Successfully');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error saving profile information');
    }
});

module.exports = router;
