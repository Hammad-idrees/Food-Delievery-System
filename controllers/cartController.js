// cartController.js

const Cart = require('../models/Cart');

// Get customer cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ customerId: req.user.id });
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error });
  }
};

// Add item to cart
exports.addToCart = async (req, res) => {
  const { productId, quantity, price } = req.body;

  try {
    let cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart) {
      cart = new Cart({
        customerId: req.user.id,
        items: [{ productId, quantity, price }],
        totalPrice: quantity * price,
        updatedAt: new Date(),
      });
      await cart.save();
    } else {
      cart.items.push({ productId, quantity, price });
      cart.totalPrice += quantity * price;
      cart.updatedAt = new Date();
      await cart.save();
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding to cart", error });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  const { productId } = req.params;

  try {
    // Find the user's cart
    const cart = await Cart.findOne({ customerId: req.user.id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Find the index of the product to remove
    const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    // Get the product details to update totalPrice before removing it
    const itemToRemove = cart.items[itemIndex];

    // Remove the item from the cart
    cart.items.splice(itemIndex, 1);

    // Update totalPrice after removing the item
    cart.totalPrice -= itemToRemove.quantity * itemToRemove.price;
    cart.updatedAt = new Date();

    // Save the updated cart
    await cart.save();

    // Respond with the updated cart
    res.status(200).json({ message: "Item removed from cart", cart });
  } catch (error) {
    console.error("Error removing item from cart:", error); // Log the error
    res.status(500).json({ message: "Error removing item from cart", error });
  }
};
