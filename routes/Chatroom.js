const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");

// CONTOLLERS ====================================================================================================
const chatroomController = require("../controllers/chatroomController");

// MIDDLEWARE ====================================================================================================
const auth = require("../middlewares/auth-session");


// @Desc         New chat room
// @controller   /controllers/chatroomController: {POST createChatroom}
router.post("/new", auth, catchErrors(chatroomController.createChatroom));

// @Desc         New chat room
// @controller   /controllers/chatroomController: {POST createChatroom}
router.post("/post/new", auth, catchErrors(chatroomController.createChatroomCat));

// @Desc         Get all chat rooms
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/get", auth, catchErrors(chatroomController.getAllChatrooms));

// @Desc         get user chat rooms
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/get/:id", auth, catchErrors(chatroomController.getUserChatrooms));

// @Desc         Get chatroom by category
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/cat/:cat_id", auth, catchErrors(chatroomController.getChatrooms_Category));

// @Desc         Get all categories
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/cats", auth, catchErrors(chatroomController.getAllCats));

// @Desc         Get chat message
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/messeges/get/:id", auth, catchErrors(chatroomController.getMesseges));

// @Desc         Delete chat room
// @controller   /controllers/chatroomController: {POST createChatroom}
router.get("/del/:id", auth, catchErrors(chatroomController.DeleteChatroom));

module.exports = router; 