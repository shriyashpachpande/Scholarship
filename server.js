const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');

const userRoutes = require('./routes/user.route');
const profileRoute = require('./routes/profile_perrsonal_information.route');
const profileAddressRoute = require('./routes/profile_address_information.route');
const profileOtherRoute = require('./routes/profile_other_information.route');
const courseRoute = require('./routes/profile_course.route');
const profilePastQualRoute = require('./routes/profile_past_qualifaction.route');
const grievanceRoute = require('./routes/grievance_suggestion.route');
const instituteRegisterRoute = require('./routes/institue_dept_regisiter.route');
const instituteDashboardRoute = require('./routes/institute_dashboard.route');


const app = express();
const PORT = 5400;

mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret', resave: false, saveUninitialized: true }));



app.use((req, res, next) => {
  const publicPaths = [
    '/login_form.html',
    '/new_applicant_registration.html',
    '/institue_dept_ddo.html',
    '/Institue_dept_regisiter.html',
    '/entry_login',
    '/entry_registration',
    '/register_institute',
    '/institute_login'
  ];

  if (
    req.path.endsWith('.html') &&
    !publicPaths.includes(req.path) &&
    !req.session.user &&
    !req.session.institute
  ) {
    return res.redirect('/login_form.html');
  }

  next();
});



app.use('/uploads', express.static('uploads'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', userRoutes);
app.use('/', profileRoute);
app.use('/', profileAddressRoute);
app.use('/', profileOtherRoute);
app.use('/', courseRoute);
app.use('/profile_past_qualifaction', profilePastQualRoute);
app.use('/', grievanceRoute);
app.use('/', instituteRegisterRoute);
app.use('/', instituteDashboardRoute);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
