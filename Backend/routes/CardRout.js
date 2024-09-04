const express = require('express');
const router = express.Router();
const CartRouter = require('../controllers/cardControllers');

router.get("/getcart/:id",CartRouter.getProductsOfUserInCart)
router.get('/oneCart/:id',CartRouter.getOneCart)
router.delete('/deleteCart/:id',CartRouter.DeleteCart)
router.post('/addCart',CartRouter.addProductToCart)
router.put('/updateCart/:id',CartRouter.updateCart)
router.get('/UserCart/:id',CartRouter.getUserCart)

module.exports = router;