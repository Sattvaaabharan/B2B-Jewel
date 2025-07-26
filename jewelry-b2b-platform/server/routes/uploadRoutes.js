const express = require('express');
const multer = require('multer');
const uploadController = require('../controllers/uploadController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Authenticated users can upload documents
router.post('/document', protect, upload.single('file'), uploadController.uploadDocument);

module.exports = router;
