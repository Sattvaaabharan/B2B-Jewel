const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware');
const messageController = require('../controllers/messageController');

// List all user conversations
router.get('/', protect, messageController.listConversations);

// Fetch all messages in a conversation
router.get('/:conversationId', protect, messageController.getMessages);

// Send a message in a conversation
router.post('/:conversationId', protect, messageController.sendMessage);

module.exports = router;
