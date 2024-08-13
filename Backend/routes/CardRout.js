const express = require('express');
const router = express.Router();
const cardController = require('../controllers/cardController');

// Add a product to the card
router.post('/add/:idUser/:id', cardController.addToCard);

// Get all products in the card
router.get('/getCard', cardController.getCard);

// Delete a product from the card by ID
router.delete('/delete/:id', cardController.deleteFromCard);

module.exports = router;