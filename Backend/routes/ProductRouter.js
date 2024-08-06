const productRouter=require('express').Router()
const productController=require('../controllers/ProductControllers')

productRouter.get('/allProducts',productController.getProducts)
productRouter.get('/getOneProd/:ProductID',productController.getOneProd)
productRouter.post('/addProduct',productController.addProd)
productRouter.delete('/deleteProd/:ProductID',productController.deleteProd)
productRouter.put('/updateProd/:ProductID',productController.updateProd)
productRouter.get('/prodsOfUser/:UserID',productController.getProdOfUser)






module.exports= productRouter;