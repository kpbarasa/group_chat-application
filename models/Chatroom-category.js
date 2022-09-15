const mongoose = require("mongoose");

const chatroomCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  Description: {
    type: String,
    required: "Description is required!",
  },
});

module.exports = mongoose.model("ChatroomCategory", chatroomCategorySchema);