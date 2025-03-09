// const mongoose = require('mongoose'); // Added missing import
// const Cart = require('../Models/Cart');
// const Watch = require('../Models/Watch');

// // Add item to cart
// exports.addToCart = async (req, res) => {
//   const { watchId, quantity = 1 } = req.body;
//   const userId = req.user._id; // From JWT via ensureAuthentication

//   // Input validation
//   if (!watchId || !mongoose.Types.ObjectId.isValid(watchId)) {
//     return res.status(400).json({ message: 'Invalid watch ID' });
//   }
//   if (!Number.isInteger(quantity) || quantity < 1) {
//     return res.status(400).json({ message: 'Quantity must be a positive integer' });
//   }

//   try {
//     const watch = await Watch.findById(watchId);
//     if (!watch) {
//       return res.status(404).json({ message: 'Watch not found' });
//     }

//     let cart = await Cart.findOne({ user: userId });
//     if (!cart) {
//       cart = new Cart({ user: userId, items: [] });
//     }

//     const itemIndex = cart.items.findIndex(
//       (item) => item.watch.toString() === watchId
//     );
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ watch: watchId, quantity });
//     }

//     await cart.save();
//     res.status(200).json({ message: 'Item added to cart successfully' });
//   } catch (error) {
//     console.error('Add to cart error:', error);
//     res.status(500).json({ message: 'Failed to add item to cart' });
//   }
// };

// // Get cart contents
// exports.getCart = async (req, res) => {
//   const userId = req.user._id;

//   try {
//     const cart = await Cart.findOne({ user: userId }).populate('items.watch');
//     res.status(200).json(cart ? cart.items : []);
//   } catch (error) {
//     console.error('Get cart error:', error);
//     res.status(500).json({ message: 'Failed to retrieve cart' });
//   }
// };

// // Get cart item count
// exports.getCartCount = async (req, res) => {
//     const userId = req.user._id;
  
//     try {
//       const cart = await Cart.findOne({ user: userId }); // Fixed from { userId }
//       const count = cart
//         ? cart.items.reduce((sum, item) => sum + item.quantity, 0)
//         : 0;
//       console.log('Cart count for user:', userId, 'Count:', count); // Debug log
//       res.status(200).json({ count });
//     } catch (error) {
//       console.error('Get cart count error:', error);
//       res.status(500).json({ message: 'Failed to retrieve cart count' });
//     }
//   };


const mongoose = require('mongoose');
const Cart = require('../Models/Cart');
const Watch = require('../Models/Watch');

// Add item to cart
exports.addToCart = async (req, res) => {
  const { watchId, quantity = 1 } = req.body;
  const userId = req.user._id;

  if (!watchId || !mongoose.Types.ObjectId.isValid(watchId)) {
    return res.status(400).json({ message: 'Invalid watch ID' });
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return res.status(400).json({ message: 'Quantity must be a positive integer' });
  }

  try {
    const watch = await Watch.findById(watchId);
    if (!watch) return res.status(404).json({ message: 'Watch not found' });

    let cart = await Cart.findOne({ user: userId });
    if (!cart) cart = new Cart({ user: userId, items: [] });

    const itemIndex = cart.items.findIndex((item) => item.watch.toString() === watchId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ watch: watchId, quantity });
    }

    await cart.save();
    res.status(200).json({ message: 'Item added to cart successfully' });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Failed to add item to cart' });
  }
};

// Get cart contents
exports.getCart = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.watch');
    res.status(200).json(cart ? cart.items : []);
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Failed to retrieve cart' });
  }
};

// Get cart item count
exports.getCartCount = async (req, res) => {
  const userId = req.user._id;
  try {
    const cart = await Cart.findOne({ user: userId });
    const count = cart ? cart.items.reduce((sum, item) => sum + item.quantity, 0) : 0;
    res.status(200).json({ count });
  } catch (error) {
    console.error('Get cart count error:', error);
    res.status(500).json({ message: 'Failed to retrieve cart count' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { watchId } = req.body;
  const userId = req.user._id;

  if (!watchId || !mongoose.Types.ObjectId.isValid(watchId)) {
    return res.status(400).json({ message: 'Invalid watch ID' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = cart.items.filter((item) => item.watch.toString() !== watchId);
    await cart.save();
    res.status(200).json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Failed to remove item' });
  }
};

// Update cart item quantity
exports.updateCartItem = async (req, res) => {
  const { watchId, quantity } = req.body;
  const userId = req.user._id;

  if (!watchId || !mongoose.Types.ObjectId.isValid(watchId)) {
    return res.status(400).json({ message: 'Invalid watch ID' });
  }
  if (!Number.isInteger(quantity) || quantity < 0) {
    return res.status(400).json({ message: 'Quantity must be a non-negative integer' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const itemIndex = cart.items.findIndex((item) => item.watch.toString() === watchId);
    if (itemIndex === -1) return res.status(404).json({ message: 'Item not found in cart' });

    if (quantity === 0) {
      cart.items.splice(itemIndex, 1); // Remove item if quantity is 0
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    res.status(200).json({ message: 'Cart item updated' });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ message: 'Failed to update cart item' });
  }
};

// Clear cart (for checkout)
exports.clearCart = async (req, res) => {
  const userId = req.user._id;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    cart.items = [];
    await cart.save();
    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Failed to clear cart' });
  }
};