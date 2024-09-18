const express = require('express');
const router = express.Router();



// Define admin-specific routes
app.post('/admin/some-admin-route', (req, res) => {
  // Admin-specific logic here
  res.status(200).json({ message: 'Admin route accessed successfully' });
});
module.exports = router;
