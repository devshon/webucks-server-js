const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductsController");
const vaildateToken = require("../middlewares/vaildateToken");
// GET
router.get("/categories", ProductsController.getCategories);
router.get("/", ProductsController.getProducts);
router.get("/:id", vaildateToken, ProductsController.getProductOne);

// POST
router.post("/likes", vaildateToken, ProductsController.createLike);

// DELETE
router.delete("/likes", vaildateToken, ProductsController.deleteLike);

module.exports = router;
