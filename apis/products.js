const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function sendCategorise(req, res) {
  try {
    console.log("### sendCategories >>> ");

    const getCatagories = await prisma.$queryRaw`
    SELECT * FROM categories;`;

    res.json(getCatagories);
  } catch (err) {
    console.log("### sendCategories err >>> ", err);
    return res.status(500).json({ message: err.message });
  }
}

async function sendProducts(req, res) {
  try {
    console.log("### sendProducts >>> ");

    const getProducts = await prisma.$queryRaw`
    SELECT * FROM products;`;

    res.json(getProducts);
  } catch (err) {
    console.log("### getProducts err >>> ", err);
    return res.status(500).json({ message: err.message });
  }
}

async function sendProductOne(req, res) {
  try {
    console.log("### sendProductOne >>> ");

    const getProductOne = await prisma.$queryRaw`
    SELECT
      products.id,
      products.korean_name,
      products.english_name,
      product_images.image_url,
      allergies.name as allergies,
      nutritions.caffein,
      nutritions.fat,
      nutritions.sugar,
      nutritions.sodium
    FROM products
    JOIN product_images 
    ON products.id = product_images.product_id
    JOIN nutritions
    ON products.id = nutritions.product_id
    JOIN products_allergies 
    ON products.id = products_allergies.product_id
    JOIN allergies
    ON allergies.id = products_allergies.allergy_id;`;

    res.json(getProductOne);
  } catch (err) {
    console.log("### getProductOne err >>> ", err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { sendProducts, sendProductOne, sendCategorise };
