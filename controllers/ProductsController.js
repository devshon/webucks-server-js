const ProductsService = require("../services/ProductsService");
const errorGenerator = require("../utils/errorGenerator");

async function getCategories(req, res, next) {
  try {
    console.log("### controller getCategories");

    const categories = await ProductsService.getCatetories();

    return res.status(200).json({ message: "SUCCESS", categories });
  } catch (err) {
    console.log("controller getCategories err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getProducts(req, res, next) {
  try {
    console.log("### controller getProducts");

    const products = await ProductsService.getProducts();

    return res.status(200).json({ message: "SUCCESS", products });
  } catch (err) {
    console.log("controller getProducts err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getProductOne(req, res, next) {
  try {
    console.log("### controller getProductOne");
    const { id } = req.body;

    if (!id) {
      throw await errorGenerator({
        statusCode: 400,
        message: "KEY_ERROR",
      });
    }

    const product = await ProductsService.getProductOne(id);

    return res.status(200).json({ message: "SUCCESS", product });
  } catch (err) {
    console.log("controller getProductOne err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function createLike(req, res, next) {
  try {
    console.log("### controller createLike");
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw await errorGenerator({
        statusCode: 400,
        message: "KEY_ERROR",
      });
    }
    await ProductsService.createLike(productId, userId);

    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.log("controller createLike err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function deleteLike(req, res, next) {
  try {
    console.log("### controller deleteLike");
    const { productId, userId } = req.body;

    if (!productId || !userId) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    await ProductsService.deleteLike(productId, userId);

    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.log("controller deleteLike err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}
module.exports = {
  getCategories,
  getProducts,
  getProductOne,
  createLike,
  deleteLike,
};
