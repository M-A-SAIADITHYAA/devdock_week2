const User = require('../models/User');
const Listing = require('../models/Listing');

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { listingId, quantity = 1 } = req.body;
    
    // Check if listing exists and is active
    const listing = await Listing.findOne({ _id: listingId, status: 'active' });
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found or not available' });
    }

    // Update user's cart
    const user = await User.findById(req.user.id);
    
    // Check if item already in cart
    const cartItemIndex = user.cart.findIndex(
      item => item.listing.toString() === listingId
    );

    if (cartItemIndex > -1) {
      // Update quantity if item exists
      user.cart[cartItemIndex].quantity += quantity;
    } else {
      // Add new item to cart
      user.cart.push({ listing: listingId, quantity });
    }

    await user.save();
    
    // Populate cart items with listing details
    const populatedUser = await User.findById(user._id)
      .populate('cart.listing');

    res.json({
      message: 'Item added to cart successfully',
      cart: populatedUser.cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding item to cart', error: error.message });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { listingId } = req.params;
    
    const user = await User.findById(req.user.id);
    user.cart = user.cart.filter(item => item.listing.toString() !== listingId);
    
    await user.save();
    
    const populatedUser = await User.findById(user._id)
      .populate('cart.listing');

    res.json({
      message: 'Item removed from cart successfully',
      cart: populatedUser.cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error: error.message });
  }
};

// Get cart items
exports.getCart = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('cart.listing');

    res.json(user.cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart', error: error.message });
  }
};

// Update cart item quantity
exports.updateCartItemQuantity = async (req, res) => {
  try {
    const { listingId } = req.params;
    const { quantity } = req.body;

    if (quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }

    const user = await User.findById(req.user.id);
    const cartItem = user.cart.find(item => item.listing.toString() === listingId);

    if (!cartItem) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    cartItem.quantity = quantity;
    await user.save();

    const populatedUser = await User.findById(user._id)
      .populate('cart.listing');

    res.json({
      message: 'Cart item quantity updated successfully',
      cart: populatedUser.cart
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating cart item quantity', error: error.message });
  }
}; 