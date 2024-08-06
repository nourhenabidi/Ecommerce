const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('ecommerce', 'root', 'abidi123', {
    host: 'localhost',
    dialect: 'mysql',
  });

  //Connection
sequelize.authenticate()
.then(() => {
  console.log("Connection has been established successfully.");
})
.catch((error) => {
  console.error("Unable to connect to the database:", error);
});



sequelize.sync({ force: false })
.then(() => {
  console.log('Chat table created (if not exist)');
})
.catch((err) => {
  console.error('Error creating Total table:', err);
});

module.exports = sequelize;