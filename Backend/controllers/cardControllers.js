const Card = require('../models/Card');

const getProductsOfUserInCart = async (req, res) => {
  try {
    const userId = req.params.id; 
    console.log("User ID: ", userId); 
    const carts = await Card.findAll({
      where: { user_id: userId }, 
    
    });

    console.log("Carts: ", carts); 

    if (!carts) {
    console.log('not found')
    }else{
      res.json(carts);
    }

  } catch (err) {
    console.error("Error fetching cart: ", err.message); // Log the specific error message
    res.status(500).json({ error: 'Internal server error' });
  }
};


const addProductToCart = async (req, res) => {
  try {
    const {  CartImage,productName, productPrice, Quantity, user_id, product_ProductID } = req.body;

    // Check if the product already exists in the cart
    const existingCart = await Card.findOne({ where: { user_id:user_id ,product_ProductID:product_ProductID } });
    
    if (existingCart) {
      return res.status(400).json({ error: 'Product already exists in the cart.' });
    }

    // Create a new cart entry
    const newCart = await Card.create({
      CartImage,
      productName,
      productPrice,
      Quantity,
      user_id,
      product_ProductID,
    });
    
    return res.status(201).json({ message: 'Successfully added to cart', data: newCart });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Failed to add product to cart' });
  }
};




   const getOneCart = async(req,res) =>{
       const carts=await  Card.findOne({where:{CartID:req.params.id}})
       res.json(carts)
   }
   const DeleteCart =  (req, res) => {
    const CartID = req.params.CartID; // Extract CartID from route parameters
  
    
  
    try {
      const result =  Card.destroy({ where: { CartID } });
     
        res.json({ message: 'Deleted successfully', affectedRows: result });
      
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
