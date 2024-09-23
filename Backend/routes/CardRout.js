const express = require('express');
const router = express.Router();
const CartRouter = require('../controllers/cardControllers');

router.get("/getcart/:id",CartRouter.getProductsOfUserInCart)
router.get('/oneCart/:id',CartRouter.getOneCart)
router.delete('/deleteCart/:CartID',CartRouter.DeleteCart)
router.post('/addCart',CartRouter.addProductToCart)
router.put('/updateCart/:id',CartRouter.updateCart)
router.get('/UserCart/:id',CartRouter.getUserCart)
router.get("/carts/:userId",CartRouter.getUserCarts)
module.exports = router;