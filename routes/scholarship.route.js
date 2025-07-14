// GET profile by application number
router.get('/profile/:appNumber', async (req, res) => {
    try {
      const data = await Scholarship.findOne({ applicationNumber: req.params.appNumber });
      if (!data) return res.status(404).json({ success: false, message: 'Application not found' });
  
      // Calculate age from dob
      const dob = new Date(data.dob);
      const today = new Date();
      const age = today.getFullYear() - dob.getFullYear();
      if (today.getMonth() < dob.getMonth() || 
          (today.getMonth() === dob.getMonth() && today.getDate() < dob.getDate())) {
        age--;
      }
  
      res.json({ success: true, data: { ...data._doc, age } });
    } catch (err) {
      res.status(500).json({ success: false, error: err.message });
    }
  });
  