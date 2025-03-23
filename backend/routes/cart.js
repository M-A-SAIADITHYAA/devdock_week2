const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  addToCart,
  removeFromCart,
  getCart,
  updateCartItemQuantity
} = require('../controllers/cartController');

router.use(auth); // All cart routes are protected

router.get('/', getCart);
router.post('/add', addToCart);
router.delete('/:listingId', removeFromCart);
router.put('/:listingId', updateCartItemQuantity);

module.exports = router; 