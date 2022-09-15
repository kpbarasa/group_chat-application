
const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "Chatroom",
  },
  chatroom_name: {
    type: String,
    required: "chatroom name is required!",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "user is required!",
    ref: "User",
  },
  user_name: {
    type: String,
    required: "user name is required!",
  },
  message: {
    type: String,
    required: "Message is required!",
  },
  media: {
    type: String
  },
  time: {
    type: String,
    required: "Time is required!",
  },
  date: {
    type: Date,
    required: "Date is required!",
  },
});

module.exports = mongoose.model("Message", messageSchema);