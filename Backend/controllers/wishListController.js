const WishList = require('../models/WishList');

module.exports = {
 addToWishList : (req, res) => {
        WishList.create(req.body)
            .then((result) => {
                res.status(201).json({ result: "Successfully added to wishlist" });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({ message: err.message });
            });
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
     getWishListsByUserId : async (req, res) => {
        try {
          const userId = req.params.id; // Get userId from request params
          console.log("User ID: ", userId); // Log user ID to verify correctness
      
          // Fetch all wishlists for the user
          const wishLists = await WishList.findAll({ where: { user_id: userId } });
          console.log("WishLists: ", wishLists); // Check if wishlists are being fetched
      
          if (wishLists.length === 0) {
            return res.status(404).json({ message: "No wishlists found for this user" });
          }
      
          // Respond with the fetched wishlists
          res.json(wishLists);
        } catch (err) {
          console.error(err); // Log the error for debugging
          res.status(500).json({ error: 'Internal server error' });
        }
      },
}