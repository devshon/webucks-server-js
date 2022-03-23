const express = require("express");
const router = express.Router();

const UsersRouter = require("./UsersRouter");
const ProductsRouter = require("./ProductsRouter");

router.use("/users", UsersRouter);
router.use("/products", ProductsRouter);

module.exports = router;
