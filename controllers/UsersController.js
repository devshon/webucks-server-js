const UsersService = require("../services/UsersService");
const errorGenerator = require("../utils/errorGenerator");

async function signupUser(req, res, next) {
  try {
    console.log("### controller signupUser");
    const { email, password } = req.body;

    await UsersService.signupUser(email, password);

    return res.status(200).json({ message: "SUCCESS" });
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

    const token = await UsersService.loginUser(email, password);

    return res.status(200).json({ message: "SUCCESS", token });
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
      throw await errorGenerator({
        statusCode: 400,
        message: "TOKEN_UNDEFINED",
      });
    }

    const identify = await UsersService.getIdentification(token);

    if (!identify) {
      throw await errorGenerator({
        statusCode: 400,
        message: "INCORRECT_TOKEN",
      });
    }

    return res.status(200).json({ message: "SUCCESS", user: identify.user });
  } catch (err) {
    console.log("getIdentification err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

async function updateUserPassword(req, res, next) {
  try {
    console.log("### controller updateUserPassword");
    const { newPassword, id } = req.body;
    if (!newPassword || !id) {
      throw await errorGenerator({ statusCode: 400, message: "KEY_ERROR" });
    }

    await UsersService.updateUserPassword(newPassword, id);

    return res.status(200).json({ message: "SUCCESS" });
  } catch (err) {
    console.log("updateUserPassword err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}
module.exports = {
  signupUser,
  getUsers,
  loginUser,
  getIdentification,
  updateUserPassword,
};
