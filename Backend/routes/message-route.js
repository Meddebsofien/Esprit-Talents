const express = require('express');
const router = express.Router();
const messageController = require('../Controllers/message-controller');

console.log('Initializing message routes...');

// Route to send a message
console.log('Adding POST /send route...');
router.post('/send', messageController.sendMessage);

// Route to get all messages in a conversation/group
console.log('Adding GET /all route...');
router.get('/all', messageController.getAllMessages);

console.log('Message routes initialized.');

module.exports = router;
