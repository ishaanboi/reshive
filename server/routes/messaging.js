const express = require('express');
const router = express.Router();
const { sendMessage, getConversation, getRecentChats } = require('../controllers/messagingController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/send', authMiddleware, sendMessage);
router.get('/conversation/:userId', authMiddleware, getConversation);
router.get('/recent', authMiddleware, getRecentChats);

module.exports = router;
