const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const chatroomController = require("../controllers/chatroomController");

const auth = require("../middlewares/auth-session");

router.post("/new", auth, catchErrors(chatroomController.createChatroom));
router.post("/post/new", auth, catchErrors(chatroomController.createChatroomCat));
router.get("/get", auth, catchErrors(chatroomController.getAllChatrooms));
router.get("/get/:id", auth, catchErrors(chatroomController.getUserChatrooms));
router.get("/cat/:cat_id", auth, catchErrors(chatroomController.getChatrooms_Category));
router.get("/cats", auth, catchErrors(chatroomController.getAllCats));
router.get("/messeges/get/:id", auth, catchErrors(chatroomController.getMesseges));
router.get("/del/:id", auth, catchErrors(chatroomController.DeleteChatroom));

module.exports = router; 