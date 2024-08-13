const Card = require('../models/Card');

module.exports = {
    addToCard: async (req, res) => {
        try {
            const { productName, productPrice } = req.body;
            const { idUser, id: ProductId } = req.params;

            const newCard = await Card.create({
                productName,
                productPrice,
                UserId: idUser,
                ProductId
            });

            res.status(200).json(newCard);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    getCard: async (req, res) => {
        try {
            const cards = await Card.findAll();
            res.status(200).json(cards);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    deleteFromCard: async (req, res) => {
        try {
            const { id } = req.params;

            const cardItem = await Card.findOne({
                where: { id }
            });

            if (cardItem) {
                await cardItem.destroy();
                res.status(200).json({ message: 'Item deleted successfully', cardItem });
            } else {
                res.status(404).json({ message: 'Item not found' });
            }
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};
