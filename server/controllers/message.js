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
