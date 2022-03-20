const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function createUser(req, res) {
  try {
    console.log("### createUser >>> ");
    const { email, password } = req.body;

    if (password.length < 8) {
      return res.status(400).json({ message: "PASSWORD_TOO_SHORT" });
    }
    const createdUser = await prisma.$queryRaw`
      INSERT INTO
        users (email, password)
      VALUES
        (${email}, ${password});
      `;

    return res.status(201).json({ message: "CREATED" });
  } catch (err) {
    console.log("### createUser err >> ", err);
    if (err.meta.code === "1062") {
      return res.status(409).json({ message: "EXSITING_USER" });
    }
    return res.status(500).json({ message: err.message });
  }
}

async function sendUser(req, res) {
  try {
    console.log("### sendUser >>> ");
    const getUser = await prisma.$queryRaw`
    SELECT * FROM
      users;
    `;

    res.json(getUser);
  } catch (err) {
    console.log("### sendUser err >> ", err);
    return res.status(500).json({ message: err.message });
  }
}

async function updateUserPassword(req, res) {
  try {
    console.log("### updateUserPassword >>> ");
    const { newPassword, id } = req.body;

    const updatePassword = await prisma.$queryRaw`
    UPDATE
      users
    SET
      password=${newPassword} 
    WHERE
      id=${id};
    `;
    return res.status(201).json({ message: "UPDATED" });
  } catch (err) {
    console.log("### updateUserPassword err >> ", err);
    return res.status(500).json({ message: err.message });
  }
}
module.exports = { createUser, sendUser, updateUserPassword };
