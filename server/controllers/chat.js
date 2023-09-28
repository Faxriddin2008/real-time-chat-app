import Chats from "../models/chat";

export const createChat = async (req, res) => {
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
