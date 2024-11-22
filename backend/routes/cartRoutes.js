const express = require('express');
const router = express.Router();
const UserCartHistory = require('../models/userCartHistoryModel');
const Purchase = require('../models/compraModel');

router.post('/cart', async (req, res) => {
  const { userId, productId, name, image, quantity, priceAtPurchase } = req.body;

  try {
      let cart = await Purchase.findOne({ userId, isActive: true });

      if (!cart) {
          cart = new Purchase({
              userId,
              products: [],
              totalAmount: 0,
          });
      }

      const existingProductIndex = cart.products.findIndex(p => p.productId.toString() === productId);

      if (existingProductIndex >= 0) {
          cart.products[existingProductIndex].quantity += quantity;
      } else {
          cart.products.push({ productId, name, image, quantity, priceAtPurchase });
      }

      cart.totalAmount = cart.products.reduce((sum, product) => sum + product.quantity * product.priceAtPurchase, 0);

      await cart.save();

      res.status(200).json(cart);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error adding product to the cart' });
  }
});

router.get('/cart/:userId', async (req, res) => {
  const { userId } = req.params; 

  try {
    let cart = await Purchase.findOne({ userId, isActive: true });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found for this user' }); 
    }

    res.status(200).json(cart); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving the cart' }); 
  }
});
  
  router.post('/cart/checkout', async (req, res) => {
    const { userId } = req.body;
  
    try {
      const cart = await Purchase.findOne({ userId, isActive: true });
  
      if (!cart) {
        return res.status(404).json({ message: 'There wasn´t found an active cart' });
      }
      
      if (cart.products.length === 0) {
        return res.status(400).json({ message: 'The cart is empty. The purchase can`t be closed.' });
      }

      cart.isActive = false;
      await cart.save();
  
      let userHistory = await UserCartHistory.findOne({ userId });
  
      if (!userHistory) {
        userHistory = new UserCartHistory({ userId, carts: [] });
      }
  
      userHistory.carts.push(cart._id);
      await userHistory.save();
  
      res.status(200).json({ message: 'Purchase done and cart recipt saved in the history.', cart });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error closing the purchase' });
    }
  });

router.get('/history/:userId', async (req, res) => {
    const { userId } = req.params;
  
    try {
      const userHistory = await UserCartHistory.findOne({ userId }).populate('carts');
      
      if (!userHistory || userHistory.carts.length === 0) {
        return res.status(404).json({ message: 'There wasn`t found purchases in the history' });
      }
  
      res.status(200).json(userHistory.carts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error obtaining purchase history' });
    }
  });
  
  module.exports = router;