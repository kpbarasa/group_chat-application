const router = require("express").Router();
const { catchErrors } = require("../handlers/errorHandler");
const userController = require("../controllers-users/user-account-access.controller");

router.post("/login", catchErrors(userController.login));
router.post("/register", catchErrors(userController.register));
router.get("/logout", catchErrors(userController.logout));

module.exports = router;