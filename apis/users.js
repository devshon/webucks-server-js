const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const bc = require("bcrypt"); // 해쉬암호화 라이브러리
const jwt = require("jsonwebtoken"); // 웹 토큰 생성 라이브러리

// 유저가 존재하는지 체크하는 함수
async function handleExistUser(email) {
  const isExistUser = await prisma.$queryRaw`
      SELECT
        id
      FROM
        users
      WHERE
        email=${email}
      `;
  return isExistUser.length !== 0;
}

// body에 key가 없을 시 에러르 반환 하는 함수
async function handleKeyError(error) {
  error.message = "KEY_ERROR";
  error.statusCode = 400;
  return error;
}

// 로그인 사용자가 입력한 패스워드와 디비에 저장된 암호화 패스워드와 일치하는 함수
async function handlePwCompare(password, user) {
  const isPwTrue = bc.compareSync(password, user[0]?.password);

  return isPwTrue;
}

// 유저 생성 API
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
      throw error;
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

// 유저 리스트 API
async function sendUser(req, res) {
  try {
    console.log("### sendUser >>> ");
    const getUser = await prisma.$queryRaw`
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

    res.status(200).json(getUser);
  } catch (err) {
    console.log("### sendUser err >> ", err);
    return res.status(500).json({ message: err.message });
  }
}

// 유저 패스워드 수정 API
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

// 유저 로그인 API
async function loginUser(req, res) {
  try {
    console.log("### loginUser >>> ");
    const { email, password } = req.body;
    const error = new Error();
    if (!email || !password) {
      throw handleKeyError(error);
    }
    const getUser = await prisma.$queryRaw`
    SELECT
      id,
      password
    FROM
      users
    WHERE
      email=${email}
    `;

    const isPwTrue = await handlePwCompare(password, getUser);

    if (getUser.length === 0 || !isPwTrue) {
      error.message = "INVALID_USER";
      error.statusCode = 400;
      throw error;
    }
    const user = { id: getUser[0].id };

    const token = jwt.sign({ user }, process.env.SECRET_KEY);

    return res.status(200).json({ message: "LOGIN_SUCCESS", token });
  } catch (err) {
    console.log("### loginUser err >> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

// 토큰을 받아 유저의 정보를 반환하는 API
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
