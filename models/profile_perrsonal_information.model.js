const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    required: true
  },  
  
  aadhar_no: { type: String, unique: true, required: true },
  dateofbir: String,
  age: Number,
  paraent_mobile_number: { type: String, unique: true },
  Full_name_as_per_aadhar_card: String,
  Marital_Status: String,
  religion: String,
  cast_category: String,
  cast_certifacte: String,
  cast_certifacte_file: String,
  annual_income: Number,
  income_certificate: String,
  income_certificate_file: String,
  salaried: String,
  disability: String,
  bank_account_number: { type: String, unique: true },
  ifscode: { type: String, unique: true },
  bank_branch: String
});

module.exports = mongoose.model('ProfilePersonalInfo', ProfileSchema);
