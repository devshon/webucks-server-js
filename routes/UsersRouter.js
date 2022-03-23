const express = require("express");
const router = express.Router();

const UsersController = require("../controllers/UsersController");

// GET
router.get("/", UsersController.getUsers);
router.get("/verification", UsersController.getIdentification);

// POST
router.post("/signup", UsersController.signupUser);
router.post("/login", UsersController.loginUser);

router.put("/", UsersController.updateUserPassword);
module.exports = router;
