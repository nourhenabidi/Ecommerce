const Card = require('../models/Card');

const getProductsOfUserInCart = async (req, res) => {
  try {
    const userId = req.params.id; // Get userId from request params
    console.log("User ID: ", userId); // Log user ID to verify correctness

    // Fetch all cart items for the user, and include related product details
    const carts = await Card.findAll({
      where: { user_id: userId }, // Use the correct foreign key `user_id`
    
    });

    console.log("Carts: ", carts); // Log the fetched carts for debugging

    if (carts.length === 0) {
      return res.status(404).json({ message: "No cart items found for this user" });
    }

    // Respond with the fetched carts
    res.json(carts);
  } catch (err) {
    console.error("Error fetching cart: ", err.message); // Log the specific error message
    res.status(500).json({ error: 'Internal server error' });
  }
};




  const addProductToCart = (req,res) => {
    Card.create(req.body)
    .then((result)=>{res.status(201).json({result:"successfully added to cart"})})
   .catch((err)=>{console.log(err);
   })
  }

   const getOneCart = async(req,res) =>{
       const carts=await  Card.findOne({where:{CartID:req.params.id}})
       res.json(carts)
   }
   const DeleteCart = async (req, res) => {
    const CartID = req.params.CartID; // Extract CartID from route parameters
  
    if (!CartID) {
      return res.status(400).json({ error: 'CartID is required' });
    }
  
    try {
      const result = await Card.destroy({ where: { CartID } });
      if (result) {
        res.json({ message: 'Deleted successfully', affectedRows: result });
      } else {
        res.status(404).json({ error: 'Cart item not found' });
      }
    } catch (err) {
      console.error("Error deleting item:", err);
      res.status(500).json({ error: 'An error occurred while deleting the item' });
    }
  };
  

   const updateCart = async(req,res) =>{
       const carts=await Card.update(req.body,{where:{CartID:req.params.id}})
       res.json(carts)
   }
   const getUserCart=async(req,res)=>{
       const ux=await Card.findAll({where:{user_id:req.params.id}})
       res.json(ux)
   }
   const getUserCarts = async (req, res) => {
    try {
      const userId = req.params.userId; // Use user_id instead of id
      console.log("User ID: ", userId); // For debugging
  
      // Fetch all cart items for the user, including product details
      const carts = await Card.findAll({
        where: { user_id: userId }, // Filter by user_id
     
      });
  
      // Respond with the fetched carts
      res.json(carts);
    } catch (err) {
      console.error("Error fetching user carts: ", err.message); // Log errors
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  
   
   module.exports = {getProductsOfUserInCart,getOneCart,DeleteCart,addProductToCart,updateCart,getUserCart,getUserCarts}
