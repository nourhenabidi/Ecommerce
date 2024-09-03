const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');


const Card=sequelize.define('Card',{
    CartID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    CartImage: {
        type: DataTypes.JSON,
        allowNull: true,
      },
    productPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    Quantity: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:true
      },
      product_ProductID:{
        type : DataTypes.INTEGER ,
        allowNull: true
      }
     
},
    {
        tableName: 'Card',
})

module.exports= Card