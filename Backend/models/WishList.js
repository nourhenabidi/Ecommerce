const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');


    const WishList=sequelize.define('WishList',{

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
        } 
     

    },
    {
        tableName: 'WishList',
      });

    module.exports= WishList