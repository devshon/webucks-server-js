const express = require("express");
const router = express.Router();

const ProductsController = require("../controllers/ProductsController");

// GET
router.get("/", ProductsController.getProducts);
router.get("/categories", ProductsController.getCategories);
router.get("/id", ProductsController.getProductOne);

// POST
router.post("/likes", ProductsController.createLike);

// DELETE
router.delete("/likes", ProductsController.deleteLike);

module.exports = router;
