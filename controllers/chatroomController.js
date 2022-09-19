const fs = require('fs');
const uuid = require("uuid");
const Chatroom = require("../models/Chatroom");
const ChatroomCategory = require("../models/Chatroom-category");
const Messesages = require("../models/Message");

exports.createChatroom = async (req, res) => {

  const { name, user, category, Description, image, icon_image } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  
  const splitted = image[0].split(';base64,');
  const format = splitted[0].split('/')[1];
  
  const fileName = 'img-group-'+name+'-'+ uuid.v4() + '-' + user.username + '.' + format;

  const chatroom = new Chatroom({
    name,
    user,
    category,
    Description,
    image:fileName,
    icon_image:fileName
  });

  await chatroom.save();
  

  fs.writeFileSync('./assets/images/' + fileName, splitted[1], { encoding: 'base64' });

  res.json({
    status: "success",
    message: "Chatroom created!",
  });
};

exports.createChatroomCat = async (req, res) => {
  const { name, Description } = req.body;

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomCatExists = await ChatroomCategory.findOne({ name });

  if (chatroomCatExists) throw "Chatroom with that name already exists!";

  const chatroomCat = new ChatroomCategory({
    name,
    Description
  });

  await chatroomCat.save()
  res.json({
    status: "success",
    message: "chatroom Category:" + req.body.name + " created!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const chatrooms = await Chatroom.find({});
  res.json(chatrooms);
};

// @desc    Get all room categories
// @route   GET /chatroom
// @Model   /models/Chatroom-category.model 
exports.getAllCats = async (req, res) => {
  const Categories = await ChatroomCategory.find({});

  res.json(Categories);
};

// @desc    Get all room categories
// @route   GET /chatroom
// @Model   /models/Chatroom-category.model 
exports.getAllChatroomsCats = async (req, res) => {
  const categories = await Chatroom.find({});

  res.json(categories);
};

// @desc    Get user rooms
// @route   GET /get/:id
// @Model   /models/Chatroom.model 
exports.getUserChatrooms = async (req, res) => {

  const id = req.params.id

  const chatrooms = await Chatroom.find({ user: id });

  res.json(chatrooms);
};

// @desc    Get all room category
// @route   GET /chatroom
// @Model   /models/Chatroom-category.model 
exports.getChatrooms_Category = async (req, res) => {

  const id = req.params.cat_id

  const chatrooms = await Chatroom.find({ category: id });

  res.json(chatrooms);

};

// @desc    Get Messages
// @route   GET /messeges/get/:id
// @Model   /models/Message 
exports.getMesseges = async (req, res) => {

  const id = req.params.id

  const chatMessesages = await Messesages.find({ chatroom: id });

  res.json(chatMessesages);

};

// @desc    Delete room
// @route   GET /del/:id
// @Model   /models/chatroom
exports.DeleteChatroom = async (req, res) => {

  const id = req.params.id

  const chatrooms = await Chatroom.findByIdAndDelete({ _id: id });

  res.json(chatrooms);

};