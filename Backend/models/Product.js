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
    oldPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    newPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    productCategory:{
      type: DataTypes.ENUM('Earings', 'Rings', 'Necklaces','Bracelets','Pack','Accessories hair'),
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
      defaultValue:0
  },
  colorProduct: {
    type: DataTypes.ENUM(
      'blue',
      'red',
      'green',
      'yellow',
      'black',
      'white',
      'purple',
      'pink',
      'orange',
      'gray',
      'brown',
      'silver',
      'gold',
      'beige',
      'navy',
      'turquoise',
      'teal',
      'burgundy',
      'lavender',
      'maroon',
      'olive',
      'coral',
      'peach',
      'ivory',
      'champagne',
      'rose gold'
    ),
    allowNull: false, // This ensures the field is required
  }
  
  },{tableName:'product',
});

module.exports= Product;
