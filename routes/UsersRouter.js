const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");
const vaildateEmailPw = require("../middlewares/validateEmailPw");

// GET
router.get("/", UsersController.getUsers);
router.get("/verification", UsersController.getIdentification);

// POST
router.post("/signup", vaildateEmailPw, UsersController.signupUser);
router.post("/login", vaildateEmailPw, UsersController.loginUser);

router.put("/", UsersController.updateUserPassword);
module.exports = router;
