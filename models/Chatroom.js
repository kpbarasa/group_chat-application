const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "User",
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Category is required!",
    ref: "User",
  },
  Description: {
    type: String,
    required: "Description is required!",
  },
  members: {
    type: String,
  },
  image: {
    type: String,
  },
  
  icon_image: {
    type: String,
  },
});

module.exports = mongoose.model("Chatroom", chatroomSchema);