const Card = require('../models/Card');


const getProductsOfUserInCart = async (req, res) => {
  try {
    const userId = req.params.id; // Get userId from request params
    console.log("User ID: ", userId); // Log user ID to verify correctness

    // Fetch all cart items for the user
    const carts = await Card.findAll({ where: { user_id: userId } });
    console.log("Carts: ", carts); // Check if carts are being fetched

    if (carts.length === 0) {
      return res.status(404).json({ message: "No cart items found for this user" });
    }

    // Respond with the fetched carts
    res.json(carts);
  } catch (err) {
    console.error(err); // Log the error for debugging
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
  
  
  //  const DeleteCart = async(req,res) =>{
  //      const carts=await Card.destroy({where:{CartID:req.params.id}})
  //      res.json(carts)
  //  }

   const updateCart = async(req,res) =>{
       const carts=await Card.update(req.body,{where:{CartID:req.params.id}})
       res.json(carts)
   }
   const getUserCart=async(req,res)=>{
       const ux=await Card.findAll({where:{user_id:req.params.id}})
       res.json(ux)
   }
   
   
   module.exports = {getProductsOfUserInCart,getOneCart,DeleteCart,addProductToCart,updateCart,getUserCart}














// const Card = require('../models/Card');

// module.exports = {
//     addToCard: async (req, res) => {
//         try {
//             const { productName, productPrice } = req.body;
//             const { idUser, id: ProductId } = req.params;

//             const newCard = await Card.create({
//                 productName,
//                 productPrice,
//                 UserId: idUser,
//                 ProductId
//             });

//             res.status(200).json(newCard);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     },

//     getCard: async (req, res) => {
//         try {
//             const cards = await Card.findAll();
//             res.status(200).json(cards);
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     },

//     deleteFromCard: async (req, res) => {
//         try {
//             const { id } = req.params;

//             const cardItem = await Card.findOne({
//                 where: { id }
//             });

//             if (cardItem) {
//                 await cardItem.destroy();
//                 res.status(200).json({ message: 'Item deleted successfully', cardItem });
//             } else {
//                 res.status(404).json({ message: 'Item not found' });
//             }
//         } catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     }
// };
