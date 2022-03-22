const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function signupUser(email, password) {
  console.log("### dao signupUser");
  return await prisma.$queryRaw`
      INSERT INTO
        users (email, password)
      VALUES
        (${email}, ${password});
      `;
}

async function getUserByEmail(email) {
  console.log("### dao getUserByEmail");
  return await prisma.$queryRaw`
      SELECT
        id,
        password
      FROM
        users
      WHERE
        email=${email}
      `;
}

async function getUsers() {
  console.log("### dao getUsers");
  return await prisma.$queryRaw`
    SELECT
      id,
      email,
      password,
      username,
      address,
      phone_number,
      policy_agreed
    FROM
      users;
    `;
}
module.exports = { signupUser, getUserByEmail, getUsers };
