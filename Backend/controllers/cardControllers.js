const Card = require('../models/Card');
const Product = require("../models/Product")


const getProductsOfUserInCart = async (req, res) => {
    const userId = req.params.id;
    try {
      // Fetching all cart items for the user
      const carts = await Card.findAll({ where: { user_id:userId } });
      
      // Extracting ProductIDs from the cart items
      const productIds = carts.map(cart => cart.product_ProductID);
  
      // Checking if there are any product IDs to query
      if (productIds.length > 0) {
        // Fetching products using the extracted ProductIDs
        const products = await Product.findAll({
          where: { ProductID: productIds }
        });
        
        res.status(200).json(products);
      } else {
        res.status(404).json({ message: "No products found in the cart" });
      }
    } catch (err) {
      res.status(500).json(err);
    }
  };
  const addProductToCart = (req,res) => {
    Card.create(req.body)
    .then((result)=>{res.status(201).json({result:"successfully added to cart"})})
   .catch((err)=>{res.status(500).json({err:err})})
  }



   const getOneCart = async(req,res) =>{
       const carts=await  Card.findOne({where:{CartID:req.params.id}})
       res.json(carts)
   }
   const DeleteCart = async(req,res) =>{
       const carts=await Card.destroy({where:{CartID:req.params.id}})
       res.json(carts)
   }

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
