const mongoose = require('mongoose');

const RFQSchema = new mongoose.Schema({
  buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  product: { type: String, required: true },
  specifications: { type: String, required: true },
  quantity: { type: Number, required: true },
  deliveryLocation: { type: String, required: true },
  specialReqs: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('RFQ', RFQSchema);
