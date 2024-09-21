const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');

const Form = sequelize.define('form', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  phoneNumber: {
    type: DataTypes.STRING(20),
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  userEmail: {
    type: DataTypes.STRING(255),
    allowNull: true, 
  },
  user_id:{
    type:DataTypes.INTEGER,
    allowNull:true,
    references: {
        model: 'user',
        key: 'id',
      },
  },
},

{
  tableName: 'form',
  engine: 'InnoDB',
});

module.exports = Form;