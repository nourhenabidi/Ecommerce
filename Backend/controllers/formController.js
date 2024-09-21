const Form = require('../models/Form'); // Adjust the path as needed
const User = require('../models/Users'); // Import the User model

// Create Form Function
const createForm = async (req, res) => {
  try {
    const { fullName, phoneNumber, position, email } = req.body; // Include email in the request body

    // Check if the user exists by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Create the form with the found user's ID
    const newForm = await Form.create({
      fullName,
      phoneNumber,
      position,
      user_id: user.id, // Use the ID from the found user
    });

    return res.status(201).json(newForm);
  } catch (error) {
    console.error('Error creating form:', error);
    return res.status(500).json({ error: 'Failed to create form' });
  }
};

// Export the functions
module.exports = {
  createForm,
};
