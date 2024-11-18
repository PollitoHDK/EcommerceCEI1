const mongoose = require('mongoose');

const userCartHistorySchema = new mongoose.Schema(
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      carts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Purchase',
        },
      ],
    },
    {
      timestamps: true,
    }
  );
  
  const UserCartHistory = mongoose.model('UserCartHistory', userCartHistorySchema);
  module.exports = UserCartHistory;
  