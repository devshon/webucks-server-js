const UserDao = require("../models/UsersDao");
const errorGenerator = require("../utils/errorGenerator");
const bc = require("bcrypt"); // 해쉬암호화 라이브러리
const jwt = require("jsonwebtoken"); // 웹 토큰 생성 라이브러리

async function signupUser(email, password) {
  console.log("### service signupUser");
  if (password.length < 8) {
    throw await errorGenerator({
      statusCode: 400,
      message: "PASSWORD_TOO_SHORT",
    });
  }
  const user = await UserDao.getUserByEmail(email);

  if (user.length !== 0) {
    throw await errorGenerator({
      statusCode: 409,
      message: "EXISTING_USER",
    });
  }

  const hashPw = bc.hashSync(password, bc.genSaltSync());

  return await UserDao.signupUser(email, hashPw);
}

async function getUserByEmail(email) {
  console.log("### service getUserByEmail");
  return await UserDao.getUserByEmail(email);
}

async function getUsers() {
  console.log("### service getUsers");
  return await UserDao.getUsers();
}

async function loginUser(email, password) {
  console.log("### service loginUser");

  const getUser = await UserDao.getUserByEmail(email);

  const isPwTrue = bc.compareSync(password, getUser[0]?.password);

  if (getUser.length === 0 || !isPwTrue) {
    throw await errorGenerator({
      statusCode: 400,
      message: "INVALID_USER",
    });
  }

  const user = { id: getUser[0].id };
  const token = jwt.sign({ user }, process.env.SECRET_KEY);

  return token;
}

async function getIdentification(token) {
  console.log("### service getIdentification");
  const identify = jwt.verify(token, process.env.SECRET_KEY);

  return identify;
}

async function updateUserPassword(newPassword, id) {
  console.log("### service updateUserPassword");

  if (newPassword.length < 8) {
    throw await errorGenerator({
      statusCode: 400,
      message: "PASSWORD_TOO_SHORT",
    });
  }

  const hashPw = bc.hashSync(newPassword, bc.genSaltSync());

  await UserDao.updateUserPassword(hashPw, id);
}
module.exports = {
  signupUser,
  getUserByEmail,
  getUsers,
  loginUser,
  getIdentification,
  updateUserPassword,
};
