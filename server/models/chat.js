const mongoose = require("mongoose");

const { Schema } = mongoose;

const chatSchema = Schema({ members: Array }, { timestamps: true });

const Chats = mongoose.model("Chat", chatSchema);

module.exports = Chats;
