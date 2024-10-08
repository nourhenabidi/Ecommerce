const productRouter=require('express').Router()
const productController=require('../controllers/ProductControllers')

productRouter.get('/allProducts',productController.getProducts)
productRouter.get('/getlengthProd',productController.getProdLength)
productRouter.get('/oneProduct/:name',productController.getProdByName)
productRouter.get('/getOneProd/:ProductID',productController.getOneProd)
productRouter.post('/addProduct',productController.addProd)
productRouter.delete('/deleteProd/:ProductID',productController.deleteProd)
productRouter.put('/updateProd/:ProductID',productController.updateProd)
productRouter.get('/prodsOfUser/:UserID',productController.getProdOfUser)
productRouter.get('/category/:productCategory',productController.getByCategory)
productRouter.get('/new', productController.getNewProducts);
productRouter.get('/count/:productCategory', productController.getProductsByCategoryCount);
productRouter.get('/geting/category/:productCategory', productController.getAllProductsByCategory);





module.exports= productRouter;