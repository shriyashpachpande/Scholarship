const mongoose = require('mongoose');

const instituteSchema = new mongoose.Schema({
  Institue_Code: { type: String, unique: true, required: true },
  College_Name: { type: String, required: true },
  Institue_Username: { type: String, unique: true, required: true },
  mobileNumber: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Institute', instituteSchema);
