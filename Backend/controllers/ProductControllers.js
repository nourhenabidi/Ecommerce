const Product=require('../models/Product')


module.exports={
    getAll:async(req,res)=>{
        let d=await Product.findAll()
        res.json(d)},getProducts:async(req,res)=>{
          try{ let d=await Product.findAll()
          res.json(d)}
          catch(err){ res.json(err)
          }
      },
    addProd:async(req,res)=>{
      let adProd=await Product.create(req.body)
      res.json(adProd)
    }
    ,
    getProdByName: async (req, res) => {
      try {
          let nou = await Product.findOne({ where: { name: req.params.name } });
          res.json(nou);
      } catch (err) {
          res.json(err);
      }
  },
    getOneProd:async(req,res)=>{
      let gp=await Product.findOne({where:{ProductID:req.params.ProductID}})
      res.json(gp)
    },
    deleteProd:async(req,res)=>{
      let de=await Product.destroy({where:{ProductID:req.params.ProductID}})
      res.json(de)
    },
    updateProd: async(req,res) => {
      let upProd = await Product.update(req.body,{where:{ProductID : req.params.ProductID}})
      res.json(upProd)
    },
    getProdOfUser:async(req,res)=>{
      let pu=await Product.findAll({where:{userUserID: req.params.UserID}})
      res.json(pu)
    }, 
    getByCategory : async (req, res) => {
      try {
          const products = await Product.findAll({
              where: { productCategory: req.params.productCategory }
          });
  
          if (products.length > 0) {
              res.status(200).json(products);
          } else {
              res.status(404).json({ message: 'No products found in this category' });
          }
      } catch (err) {
          res.status(500).json({ message: err.message });
      }
  },
  getNewProducts: async (req, res) => {
    try {
        const products = await Product.findAll({
            where: { newProduct: true }
        });

        if (products.length > 0) {
            res.status(200).json(products);
        } else {
            res.status(404).json({ message: 'No new products found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}
       
    }