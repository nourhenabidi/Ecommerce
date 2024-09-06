const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');


    const WishList=sequelize.define('WishList',{
        wishID: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
       wishListName:{
            type:DataTypes.STRING,
            allowNull:false
        },

       wishListPrice:{
            type:DataTypes.INTEGER,
            allowNull:false
        },

       wishListDescription:{
            type:DataTypes.TEXT,
            allowNull:false
        },
       wishListImage:{
            type: DataTypes.JSON,
            allowNull:false
        } ,
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
        tableName: 'WishList',
      });

    module.exports= WishList