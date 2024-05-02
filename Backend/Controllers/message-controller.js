const MessageModel = require('../Models/message');

// Controller function to send a message
const sendMessage = async (req, res) => {
  try {
    const { senderId, content, image, conversationId } = req.body;
    const message = new MessageModel({ senderId, content, image, conversationId });
    const savedMessage = await message.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Controller function to get all messages in a conversation/group
const getAllMessages = async (req, res) => {
  try {
    const { conversationId } = req.query;
    const messages = await MessageModel.find({ conversationId }).populate('senderId');
    res.json(messages);
  } catch (error) {
    console.error('Error getting messages:', error);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};

module.exports = { sendMessage, getAllMessages };
