const Messages = require("../models/message");

exports.createMessage = async (req, res) => {
  const { chatId, text, senderId } = req.body;
  try {
    const message = await Messages.create({ chatId, text, senderId });
    res.status(200).json(message);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const messages = await Messages.find({ chatId });
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
};
