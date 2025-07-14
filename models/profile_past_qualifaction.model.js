const mongoose = require('mongoose');

const profilePastQualificationSchema = new mongoose.Schema({
    applicationNumber: {
        type: String,
        required: true
      },   
         
    post_category: String,
    hosteller_hostel_type: String,
    hosteller_house_name: String,
    hosteller_hostel_address: String,
    student_hostel_id: {
        type: String,
        unique: true,
        required: true
    },
    hostel_date: String,
    hostel_mess: String,
    hostel_rent_month: String,
    hostellar_certi: String,
    hosteller_pincode: String
});

module.exports = mongoose.model('ProfilePastQualification', profilePastQualificationSchema);
