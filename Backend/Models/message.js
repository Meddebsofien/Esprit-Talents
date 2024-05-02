const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  image: { type: String }, // Assuming the image is stored as a URL
  conversationId: { type: mongoose.Schema.Types.ObjectId, },
  createdAt: { type: Date, default: Date.now }
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = MessageModel;
