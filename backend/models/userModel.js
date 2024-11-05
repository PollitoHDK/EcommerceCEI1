const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'cliente'],
    default: 'cliente',
  },
  cart: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  purchaseHistory: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Purchase',
    },
  ],
}, {
  timestamps: true, // Agrega 'createdAt' y 'updatedAt' automáticamente
});

const User = mongoose.model('User', userSchema);
module.exports = User;
