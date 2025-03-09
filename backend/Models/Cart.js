const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  items: [
    {
      watch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Watch',
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
        min: 1, // Prevents negative or zero quantities
      },
    },
  ],
});

module.exports = mongoose.model('Cart', cartSchema);