const Form = require('../models/Form');
const User = require('../models/Users');
const Card = require('../models/Card'); // Import the Cart model

// Create Form Function

const createForm = async (req, res) => {
  try {
    const { fullName, phoneNumber, position, email } = req.body;
    const { cart_user } = req.params; // Ensure cart_user is passed correctly

    // Check if the user exists by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Log to verify user and cart_user parameters
    console.log("User found:", user.id, "Cart User ID:", cart_user);

    // Find the user's cart using cart_user
    const userCart = await Card.findOne({ where: { user_id: user.id } });
    
    if (!userCart) {
      return res.status(404).json({ error: 'Cart not found for this user' });
    }

    // Log to verify cart data
    console.log("User Cart found:", userCart);

    // Create the form with the found user's ID and cart ID
    const newForm = await Form.create({
      fullName,
      phoneNumber,
      position,
      cart_user,
      userEmail: email,
      user_id: user.id,
      card_id: userCart.CartID, // Assign the cart ID
    });

    // Respond with the new form and the cart data
    return res.status(201).json({
      newForm,
      userCart,
    });
  } catch (error) {
    console.error('Error creating form:', error.message);
    return res.status(500).json({ error: 'Failed to create form' });
  }
};



const geFormsUsers=async (req,res)=>{
  try{
const f=await Form.findAll()
res.json(f)
  }
 catch (error) {
    res.status(500).json({ error: error.message });
  }
}
module.exports = {
  createForm,
  geFormsUsers
};

