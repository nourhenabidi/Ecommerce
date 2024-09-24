const express = require('express');
const router = express.Router();
const formController  = require('../controllers/formController'); // Import the controller

// Correctly use formController.createForm and formController.geFormsUsers
router.post('/submit/:cart_user', formController.createForm);  // Use the correct reference from formController
router.get("/getForms", formController.geFormsUsers);

module.exports = router;