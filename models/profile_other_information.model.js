const mongoose = require('mongoose');

const profileOtherSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    required: true
  },
  
  isFatherAlive: String,
  full_FatherName: String,
  fatherOccupation: String,
  isFatherSalaried: String,

  isMotherAlive: String,
  full_motherName: String,
  motherOccupation: String,
  isMotherSalaried: String
});

module.exports = mongoose.model('ProfileOtherInformation', profileOtherSchema);
