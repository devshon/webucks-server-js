const UsersService = require("../services/UsersService");

// // body에 key가 없을 시 에러르 반환 하는 함수
// async function handleKeyError(error) {
//   const error = new Error("KEY_ERROR");
//   error.statusCode = 400;
//   return error;
// }

async function signupUser(req, res, next) {
  try {
    console.log("### controller signupUser");
    const { email, password } = req.body;

    if (!email || !password) {
      // throw handleKeyError();
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      return error;
    }

    await UsersService.signupUser(email, password);

    return res.status(200).json({ message: "SIGNUP_SUCCESS" });
  } catch (err) {
    console.log("controller signupUser err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getUsers(req, res, next) {
  try {
    console.log("### controller getUsers");
    const users = await UsersService.getUsers();

    return res.status(200).json({ message: "SUCCESS", users });
  } catch (err) {
    console.log("getUsers err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function loginUser(req, res, next) {
  try {
    console.log("### controller loginUser");
    const { email, password } = req.body;

    if (!email || !password) {
      // throw handleKeyError();
      const error = new Error("KEY_ERROR");
      error.statusCode = 400;
      return error;
    }
    const token = await UsersService.loginUser(email, password);

    return res.status(200).json({ message: "LOGIN_SUCCESS", token });
  } catch (err) {
    console.log("loginUser err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function getIdentification(req, res, next) {
  try {
    console.log("### controller getIdentification");
    const { token } = req.headers;

    if (!token) {
      error.message = "TOKEN_UNDEFINED";
      error.statusCode = 400;
      throw error;
    }

    const identify = await UsersService.getIdentification(token);

    return res.status(200).json({ user: identify.user });
  } catch (err) {
    console.log("getIdentification err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}
module.exports = {
  signupUser,
  getUsers,
  loginUser,
  getIdentification,
};

// // 아래 정의된 함수는 지난 수업시간에 다룬 내용 입니다.
// const signUp = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const foundUser = await UserService.findUser({ email });
//     if (foundUser) errorGenerator({ statusCode: 409, message: "duplicated" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const createdUser = await UserService.createUser({
//       email,
//       password: hashedPassword,
//     });

//     res.status(201).json({
//       message: "user created",
//       user_id: createdUser.id,
//     });
//   } catch (err) {
//     next(err);
//   }
// };
