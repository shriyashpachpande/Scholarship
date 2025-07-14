const mongoose = require('mongoose');

const profileCourseSchema = new mongoose.Schema({
  applicationNumber: {
    type: String,
    required: true
  },  
  
  Addmission_year: Number,
  course_institue_state: String,
  course_institue_district: String,
  course_institue_taluka: String,
  _course_Qualification_Level: String,
  _course_stream: String,
  course_collage_name: String,
  course_name: String,
  Addmission_type: String,
  CET_MERIT: String, 
  course_admit_id: {
    type: String,
    required: true,
    unique: true,
  },
  year_of_study: String,
  course_first_year_completed_or_purshing: String,
  Addmission_in_collage_infirst_year: Number,
  Percentage: Number,
  course_result: String,
  course_addmission_or_reversed: String,
  course_upload_marksheet: String, 
  Course_gap_year: Number,
});

module.exports = mongoose.model('ProfileCourse', profileCourseSchema);
