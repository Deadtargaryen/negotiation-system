const express = require('express');
const { startNegotiation, sendOffer, endNegotiation } = require('../controllers/negotiationController');
const authenticate = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/start-negotiation', authenticate, startNegotiation);
router.post('/send-offer', authenticate, sendOffer);
router.post('/end-negotiation', authenticate, endNegotiation);

module.exports = router;
