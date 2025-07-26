const messageService = require('../services/messageService');

exports.listConversations = async (req, res, next) => {
  try {
    const convos = await messageService.listConversations(req.user._id);
    res.json(convos);
  } catch (err) { next(err); }
};

exports.getMessages = async (req, res, next) => {
  try {
    const messages = await messageService.getMessages(req.params.conversationId);
    res.json(messages);
  } catch (err) { next(err); }
};

exports.sendMessage = async (req, res, next) => {
  try {
    const { conversationId } = req.params;
    const { text, receiverId } = req.body;
    const message = await messageService.sendMessage({
      conversationId,
      senderId: req.user._id,
      receiverId,
      text
    });
    res.status(201).json(message);
  } catch (err) { next(err); }
};
