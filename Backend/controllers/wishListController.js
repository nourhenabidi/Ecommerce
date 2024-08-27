const WishList = require('../models/WishList');

module.exports = {
    addToWishList: async (req, res) => {
        try {
            const { wishListName, wishListPrice, wishListDescription, wishListImage } = req.body;
            const { UserId } = req.params;

            const newWishList = await WishList.create({
                wishListName,
                wishListPrice,
                wishListDescription,
                wishListImage,
                UserId
            });

            res.status(200).json(newWishList);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteFromWishlist: async (req, res) => {
        try {
            const { namewishlist } = req.params;

            const wishListItem = await WishList.findOne({
                where: {
                    wishListName: namewishlist
                }
            });

            if (wishListItem) {
                await wishListItem.destroy();
                res.status(200).json({ message: 'Item deleted successfully', wishListItem });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getWishByName: async (req, res) => {
        try {
            const wishList = await WishList.findOne({ 
                where: { wishListName: req.params.name } 
            });

            if (wishList) {
                res.status(200).json(wishList);
            } else {
                res.status(404).json({ message: 'Wishlist item not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    getAll: async (req, res) => {
        try {
            const wishLists = await WishList.findAll();
            res.status(200).json(wishLists);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
}