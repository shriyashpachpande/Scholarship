const mongoose = require('mongoose');

const grievanceSuggestionSchema = new mongoose.Schema({
  applicationNumber: { type: String, required: true }, // from session
  fname: String,
  middlename: String,
  lastname: String,
  gmail: String,
  district: String,
  pincode: String,
  department: String,
  scheme: String,
  category: String,
  academic: String,
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('GrievanceSuggestion', grievanceSuggestionSchema);
