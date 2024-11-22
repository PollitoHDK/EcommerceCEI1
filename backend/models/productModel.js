const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  image: {
    type: String, // Cambia a tipo String para almacenar la URL
  },
}, {
  timestamps: true,
});


const Product = mongoose.model('Product', productSchema);
module.exports = Product;
