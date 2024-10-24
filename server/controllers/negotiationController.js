const Negotiation = require('../models/negotiation');
const Product = require('../models/product');

// Start negotiation
exports.startNegotiation = async (req, res) => {
  const { productId, initialOffer } = req.body;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const negotiation = new Negotiation({
      productId,
      buyerId: req.userId,
      initialOffer,
      currentPrice: initialOffer,
    });

    await negotiation.save();
    res.status(201).json(negotiation);
  } catch (error) {
    res.status(500).json({ error: 'Error starting negotiation' });
  }
};

// Submit offer
exports.sendOffer = async (req, res) => {
  const { productId, currentOffer } = req.body;
  try {
    const negotiation = await Negotiation.findOne({ productId, buyerId: req.userId });
    if (!negotiation) return res.status(404).json({ error: 'Negotiation not found' });

    // Logic to accept, counter, or reject offer
    if (currentOffer >= negotiation.currentPrice * 0.9) {
      negotiation.accepted = true;
      await negotiation.save();
      return res.json({ accepted: true });
    } else {
      const counterOffer = negotiation.currentPrice * 0.95;
      negotiation.currentPrice = counterOffer;
      await negotiation.save();
      return res.json({ counterOffer });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error submitting offer' });
  }
};

// End negotiation
exports.endNegotiation = async (req, res) => {
  const { productId } = req.body;
  try {
    const negotiation = await Negotiation.findOneAndDelete({ productId, buyerId: req.userId });
    if (!negotiation) return res.status(404).json({ error: 'Negotiation not found' });

    res.json({ message: 'Negotiation ended' });
  } catch (error) {
    res.status(500).json({ error: 'Error ending negotiation' });
  }
};
