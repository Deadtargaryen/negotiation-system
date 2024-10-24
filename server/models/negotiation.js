const mongoose = require('mongoose');

const negotiationSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  buyerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  initialOffer: { type: Number, required: true },
  currentPrice: { type: Number, required: true },
  accepted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Negotiation', negotiationSchema);
