const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');

const Product = sequelize.define('product', {
    ProductID: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ProductImage: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    Name: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    Description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    Price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    productCategory:{
      type: DataTypes.ENUM('Earings', 'Rings', 'Necklaces','Bracelets','Pack'),
      allowNull: false 
  }, 

    Availability:{
      type:DataTypes.BOOLEAN,
      defaultValue: false 
  }, 

    newProduct:{
      type:DataTypes.BOOLEAN,
      defaultValue: false 
  },
    productRemise:{
      type:DataTypes.DECIMAL,
      defaultValue:0.0
  },
    
  },{tableName:'product',
});

module.exports= Product;
