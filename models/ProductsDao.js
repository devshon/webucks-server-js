const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function getCatetories() {
  console.log("### dao getProducts");
  return await prisma.$queryRaw`
    SELECT
      id,
      name
    FROM
      categories;
    `;
}

async function getProducts() {
  console.log("### dao getProducts");
  return await prisma.$queryRaw`
    SELECT
      id,
      korean_name,
      english_name,
      category_id
    FROM
      products;
    `;
}

async function getProductOne(id) {
  console.log("### dao getProductOne");

  return await prisma.$queryRaw`
    SELECT
      products.id,
      products.korean_name,
      products.english_name,
      products_images.image_url,
      allergies.name as allergies,
      nutritions.caffein,
      nutritions.fat,
      nutritions.sugar,
      nutritions.sodium
    FROM products
    JOIN products_images 
    ON products.id = products_images.product_id
    JOIN nutritions
    ON products.id = nutritions.product_id
    JOIN products_allergies 
    ON products.id = products_allergies.product_id
    JOIN allergies
    ON allergies.id = products_allergies.allergy_id
    WHERE products.id=${id};
    `;
}

async function createLike(productId, userId) {
  console.log("### dao createLike");

  return await prisma.$queryRaw`
    INSERT INTO
      products_likes (product_id, user_id)
    VALUE
      (${productId},${userId});
    `;
}

async function deleteLike(productId, userId) {
  console.log("### dao deleteLike");

  return await prisma.$queryRaw`
    DELETE FROM 
	    products_likes 
    WHERE 
	    product_id=${productId}
    AND
 	    user_id=${userId};
    `;
}

module.exports = {
  getCatetories,
  getProducts,
  getProductOne,
  createLike,
  deleteLike,
};
