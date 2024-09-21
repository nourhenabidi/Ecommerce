const express = require('express');
const router = express.Router();
const { createForm } = require('../controllers/formController'); // Ensure correct import

// POST route to submit a form
router.post('/submit',createForm); // Correct usage

module.exports = router;
