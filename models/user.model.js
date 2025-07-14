const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  applicationNumber: { type: String, unique: true },
  studentID: { type: String, unique: true },
  firstName: String,
  middleName: String,
  lastName: String,
  username: { type: String, unique: true },
  mobileNumber: { type: String, unique: true },
  gender: String,
  dateOfBirth: String,
  email: { type: String, unique: true },
  password: String
});

module.exports = mongoose.model('User', userSchema);
