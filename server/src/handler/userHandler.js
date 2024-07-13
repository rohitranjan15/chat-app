const db = require("../../global/config");

const bcrypt = require("bcryptjs");

const loginHandler = async (request) => {
  try {
  } catch (error) {
    throw error;
  }
};

const signupHandler = async (request, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      request.email,
    ]);
    if (rows.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(request.password, 10);
    await db.query(
      "INSERT INTO user (username, email, password) VALUES (?, ?, ?)",
      [request.name, request.email, hashedPassword]
    );
    return res.status(200).json({ message: "Success" });
  } catch (error) {
    throw error;
  }
};

module.exports = {
  loginHandler,
  signupHandler,
};
