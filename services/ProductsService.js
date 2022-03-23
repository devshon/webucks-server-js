const ProductsDao = require("../models/ProductsDao");

async function getCatetories() {
  console.log("### service getCatetories");

  return await ProductsDao.getCatetories();
}

async function getProducts() {
  console.log("### service getProducts");

  return await ProductsDao.getProducts();
}

async function getProductOne(id) {
  console.log("### service getProductOne");

  return await ProductsDao.getProductOne(id);
}

async function createLike(productId, userId) {
  console.log("### service createLike");

  return await ProductsDao.createLike(productId, userId);
}

async function deleteLike(productId, userId) {
  console.log("### service deleteLike");

  return await ProductsDao.deleteLike(productId, userId);
}

module.exports = {
  getCatetories,
  getProducts,
  getProductOne,
  createLike,
  deleteLike,
};
