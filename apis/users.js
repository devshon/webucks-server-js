const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(req, res) {
  try {
    console.log("### createUser >>> ");
    const { email, password } = req.body;
    console.log("email >> ", email, "password >> ", password);

    const createdUser = await prisma.$queryRaw`
      INSERT INTO users(email, password)
      VALUES (${email}, ${password});
    `;

    return res.status(201).json({ message: "CREATED" });
  } catch (err) {
    console.log("### createUser err >> ", err);
    return res.status(500).json({ message: err.message });
  }
}

async function sendUser(req, res) {
  try {
    const getUser = await prisma.$queryRaw`SELECT * FROM users;`;
    console.log("### sendUser >>> ", getUser);

    res.json(getUser);
  } catch (err) {
    console.log("### createUser err >> ", err);
    return res.status(500).json({ message: err.message });
  }
}

module.exports = { createUser, sendUser };
