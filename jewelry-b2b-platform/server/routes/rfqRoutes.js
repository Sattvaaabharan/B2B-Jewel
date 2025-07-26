// server/routes/rfqRoutes.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const rfqController = require('../controllers/rfqController');

// Create a new RFQ (Request for Quote)
router.post('/', protect, rfqController.createRFQ);

// List all RFQs (with optional filters)
router.get('/', protect, rfqController.listRFQs);

// List recent RFQs of the logged-in user
router.get('/recent', protect, rfqController.recentRFQs);

module.exports = router;
