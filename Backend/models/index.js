const { user, wishlist, card, product } = require('../models/index');


// Define associations here
// User and WishList: One user can have many wish lists
user.hasMany(wishlist, { foreignKey: 'id', as: 'wishLists' });
wishlist.belongsTo(user, { foreignKey: 'id', as: 'user' });

// User and Card: One user can have many cards
user.hasMany(card, { foreignKey: 'id', as: 'cards' });
card.belongsTo(user, { foreignKey: 'user_id', as: 'user' });

product.hasMany(card, { foreignKey: 'ProductId', as: 'cards' });
card.belongsTo(product, { foreignKey: 'Product_id', as: 'product' });

// Product and WishList: Many-to-Many relationship using a join table
product.belongsToMany(wishlist, { through: 'WishListProducts', foreignKey: 'ProductId', as: 'wishLists' });
wishlist.belongsToMany(product, { through: 'WishListProducts', foreignKey: 'WishListId', as: 'products' });

// Export models with relationships
module.exports = {
    sequelize,
    card,
    product,
    user,
    wishlist
};
