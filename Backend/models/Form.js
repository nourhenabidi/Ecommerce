const sequelize = require('../db/index');
const { DataTypes } = require('sequelize');

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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'user', // or 'Users' depending on your actual table name
      key: 'id',
    },
  },
  card_id: { // Changed from `cart_user` to `card_id` to make it clear
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'card', // or 'Cards' depending on your actual table name
      key: 'CartID',
    },
  }

},
{
  tableName: 'form',
  engine: 'InnoDB',
});

module.exports = Form;
