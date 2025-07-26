const Message = require('../models/Message');
const mongoose = require('mongoose');

exports.listConversations = async (userId) => {
  return Message.aggregate([
    { $match: { $or: [{ senderId: new mongoose.Types.ObjectId(userId) }, { receiverId: new mongoose.Types.ObjectId(userId) }] } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$conversationId",
        lastMessage: { $first: "$text" },
        lastTime: { $first: "$createdAt" },
        partnerId: { $first: "$receiverId" }
      }
    }
  ]);
};

exports.getMessages = async (conversationId) => {
  return Message.find({ conversationId }).sort('createdAt');
};

exports.sendMessage = async ({ conversationId, senderId, receiverId, text }) => {
  const message = new Message({ conversationId, senderId, receiverId, text });
  await message.save();
  return message;
};
