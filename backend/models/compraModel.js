const purchaseSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        priceAtPurchase: {
          type: Number,
          required: true, // Precio del producto en el momento de la compra
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true, // Total de la compra
    },
    purchaseDate: {
      type: Date,
      default: Date.now,
    },
  }, {
    timestamps: true,
  });
  
  const Purchase = mongoose.model('Purchase', purchaseSchema);
  module.exports = Purchase;
  