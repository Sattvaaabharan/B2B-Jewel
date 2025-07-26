const express = require('express');
const companyController = require('../controllers/companyController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', protect, companyController.registerCompany);
router.get('/', protect, companyController.getCompanies);

module.exports = router;
