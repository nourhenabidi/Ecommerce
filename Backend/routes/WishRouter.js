const WishRouter=require('express').Router()
const wishListController= require ("../controllers/wishListController")


WishRouter.get('/getwish/:id',wishListController.getWishListsByUserId)
WishRouter.get('/onewish/:name',wishListController.getWishByName)
WishRouter.post('/addwish',wishListController.addToWishList)
WishRouter.delete('/deletewish/:name',wishListController.deleteFromWishlist)

module.exports=WishRouter