const Chats = require("../models/chat");
exports.createChat = async (req, res) => {
  const { firstId, secondId } = req.body;
  try {
    const chat = await Chats.findOne({
      members: { $all: [firstId, secondId] },
    });

    if (chat) return res.status(200).json(chat);

    const newChat = await Chats.create({ members: [firstId, secondId] });

    res.status(200).json(newChat);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findUserChats = async (req, res) => {
  const userId = req.params.userId;
  try {
    const chats = await Chats.find({ members: { $in: [userId] } });
    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chats.find({ members: { $all: [firstId, secondId] } });
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json(error);
  }
};
