const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bc = require("bcrypt");
const jwt = require("jsonwebtoken");

async function handleExistUser(email) {
  const isExistUser = await prisma.$queryRaw`
      SELECT * FROM
        users
      WHERE
        email=${email}
      `;
  return isExistUser.length > 0;
}
async function handleKeyError(error) {
  error.message = "KEY_ERROR";
  error.statusCode = 400;
  return error;
}

async function createUser(req, res) {
  try {
    console.log("### createUser >>> ");
    const { email, password } = req.body;
    const error = new Error();

    if (!email || !password) {
      throw handleKeyError(error);
    }
    const isExistUser = await handleExistUser(email);
    if (isExistUser) {
      error.message = "EXISTING_USER";
      error.statusCode = 409;
      throw error;
    }
    if (password.length < 8) {
      error.message = "PASSWORD_TOO_SHORT";
      error.statusCode = 400;
    }

    const salt = bc.genSaltSync();
    const hashPw = bc.hashSync(password, salt);

    const createdUser = await prisma.$queryRaw`
      INSERT INTO
        users (email, password)
      VALUES
        (${email}, ${hashPw});
      `;

    return res.status(201).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log("### createUser err >> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function sendUser(req, res) {
  try {
    console.log("### sendUser >>> ");
    const getUser = await prisma.$queryRaw`
    SELECT * FROM
      users;
    `;

    res.status(200).json(getUser);
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

async function handlePwCompare(password, user) {
  const isPwTrue = bc.compareSync(password, user[0]?.password);

  return !isPwTrue;
}
async function loginUser(req, res) {
  try {
    console.log("### loginUser >>> ");
    const { email, password } = req.body;
    const error = new Error();
    if (!email || !password) {
      throw handleKeyError(error);
    }
    const getUser = await prisma.$queryRaw`
    SELECT users.id, users.password FROM users WHERE email=${email}
    `;

    const isPwFalse = await handlePwCompare(password, getUser);

    if (getUser.length <= 0 || isPwFalse) {
      error.message = "INVALID_USER";
      error.statusCode = 400;
      throw error;
    }
    const user = { id: getUser[0].id };

    const token = jwt.sign({ user }, process.env.SECRET_KEY);

    return res.status(200).json({ token });
  } catch (err) {
    console.log("### loginUser err >> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function sendIdentification(req, res) {
  try {
    console.log("### sendIdentification >>> ");
    const error = new Error();
    const { token } = req.headers;

    if (!token) {
      error.message = "TOKEN_UNDEFINED";
      error.statusCode = 400;
      throw error;
    }
    const identify = jwt.verify(token, process.env.SECRET_KEY);
    return res.status(200).json({ user: identify.user });
  } catch (err) {
    console.log("### sendIdentification err >> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}
module.exports = {
  createUser,
  sendUser,
  updateUserPassword,
  loginUser,
  sendIdentification,
};
