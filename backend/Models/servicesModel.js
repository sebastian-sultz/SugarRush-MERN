const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  bgColor: { type: String, required: true },
  textColor: { type: String, required: true }
}, { timestamps: true });

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
