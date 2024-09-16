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

 deleteFromWishlist : async (req, res) => {
        const { wishID } = req.params; // Extract wishID from route parameters
    
        if (!wishID) {
            return res.status(400).json({ error: 'WishID is required' });
        }
    
        try {
            // Log the wishID being used
            console.log("Attempting to delete item with WishID:", wishID);
    
            const result = await WishList.destroy({ where: { wishId: wishID } }); // Use the correct column name
    
            if (result > 0) { // Check if any rows were affected
                res.json({ message: 'Deleted successfully', affectedRows: result });
            } else {
                res.status(404).json({ error: 'Item not found' });
            }
        } catch (err) {
            // Log the full error for debugging
            console.error("Error deleting item:", err);
            res.status(500).json({ error: 'An error occurred while deleting the item', details: err.message });
        }
    }
    
    ,
    
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