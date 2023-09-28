const mongoose = require("mongoose");

const { Schema } = mongoose;

const messageSchema = Schema(
  { chatId: String, senderId: String, text: String },
  { timestamps: true }
);

const Messages = mongoose.model("Message", messageSchema);

module.exports = Messages;
