const errorGenerator = require("../utils/errorGenerator");

async function vaildateEmailPw(req, res, next) {
  try {
    console.log("### vaildateEmailPw", req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      throw await errorGenerator({
        statusCode: 400,
        message: "KEY_ERROR",
      });
    }

    next();
  } catch (err) {
    console.log("middleware vaildateEmailPw err >>> ", err);
    return res.status(err.statusCode || 500).json({ message: err.message });
  }
}

module.exports = vaildateEmailPw;
