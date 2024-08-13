const { userM, wishlistM, cardM, productM } = require('../models/index');


// Define associations here
// User and WishList: One user can have many wish lists
userM.hasMany(wishlistM, { foreignKey: 'UserId', as: 'wishLists' });
wishlistM.belongsTo(userM, { foreignKey: 'UserId', as: 'user' });

// User and Card: One user can have many cards
userM.hasMany(cardM, { foreignKey: 'UserId', as: 'cards' });
cardM.belongsTo(userM, { foreignKey: 'UserId', as: 'user' });

productM.hasMany(cardM, { foreignKey: 'ProductId', as: 'cards' });
cardM.belongsTo(productM, { foreignKey: 'ProductId', as: 'product' });

// Product and WishList: Many-to-Many relationship using a join table
productM.belongsToMany(wishlistM, { through: 'WishListProducts', foreignKey: 'ProductId', as: 'wishLists' });
wishlistM.belongsToMany(productM, { through: 'WishListProducts', foreignKey: 'WishListId', as: 'products' });

// Export models with relationships
module.exports = {
    sequelize,
    cardM,
    productM,
    userM,
    wishlistM
};
