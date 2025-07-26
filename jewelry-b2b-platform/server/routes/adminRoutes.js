const express = require('express');
const adminController = require('../controllers/adminController');
const { protect } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/roleMiddleware');

const router = express.Router();

// Only admins should access these
router.use(protect);
router.use(authorizeRoles('admin'));

router.get('/pending', adminController.listPending);
router.post('/approve/:companyId', adminController.approveCompany);
router.post('/reject/:companyId', adminController.rejectCompany);

module.exports = router;
