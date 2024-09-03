const express = require('express');
const router = express.Router();
const CartRouter = require('../controllers/cardControllers');

router.get("/Cart",CartRouter.getAllCrats)
router.get('/OneCart/:id',CartRouter.getOneCart)
router.delete('/deleteCart/:id',CartRouter.DeleteCart)
router.post('/addCart',CartRouter.addCart)
router.put('/updateCart/:id',CartRouter.updateCart)
router.get('/UserCart/:id',CartRouter.getUserCart)

module.exports = router;