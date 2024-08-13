const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');


const Card=sequelize.define('Card',{
    productName:{
        type:DataTypes.STRING,
        allowNull:false
    },
    productPrice:{
        type:DataTypes.INTEGER,
        allowNull:false
    }
},
    {
        tableName: 'Card',
})

module.exports= Card