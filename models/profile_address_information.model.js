const mongoose = require('mongoose');

const profileAddressSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    required: true
  },
  
  Correspondence_address: String,
  Correspondence_state: String,
  Correspondence_district: String,
  Correspondence_taluka: String,
  Correspondence_village: String,
  Correspondence_pincode: String
});

module.exports = mongoose.model('ProfileAddress', profileAddressSchema);
