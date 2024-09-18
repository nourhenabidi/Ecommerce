const sequelize= require ('../db/index');
const {DataTypes } = require('sequelize');

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: 'client',
  },
},

{
  tableName: 'user',
  engine: 'InnoDB',
});

module.exports = User;
