const { user, wishlist, card, product,form } = require('../models/index');


// Define associations here
// User and WishList: One user can have many wish lists
user.hasMany(wishlist, { foreignKey: 'id', as: 'wishLists' });
wishlist.belongsTo(user, { foreignKey: 'id', as: 'user' });

// User and Form: One user can have many forms
user.hasMany(form, { foreignKey: 'user_id', as: 'forms' });
form.belongsTo(user, { foreignKey: 'user_id', as: 'user' });

// User and Card: One user can have many cards
user.hasMany(card, { foreignKey: 'id', as: 'cards' });
card.belongsTo(user, { foreignKey: 'user_id', as: 'user' });

product.hasMany(card, {foreignKey: 'product_ProductID',as: 'carts'});
card.belongsTo(product, {foreignKey: 'product_ProductID',as: 'product' });

// Product and WishList: Many-to-Many relationship using a join table
product.belongsToMany(wishlist, { through: 'WishListProducts', foreignKey: 'ProductId', as: 'wishLists' });
wishlist.belongsToMany(product, { through: 'WishListProducts', foreignKey: 'WishListId', as: 'products' });

// Export models with relationships
module.exports = {
    sequelize,
    card,
    product,
    user,
    wishlist,
    form
};
