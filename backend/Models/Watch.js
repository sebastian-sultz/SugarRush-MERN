const mongoose = require('mongoose');

const watchSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bgColor: { type: String, required: true },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative'],
  },
  textColor: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Watch', watchSchema);