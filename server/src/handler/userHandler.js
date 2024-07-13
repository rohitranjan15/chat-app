const db = require("../../global/config");
const jwt = require("jsonwebtoken");

const bcrypt = require("bcryptjs");

const loginHandler = async (request, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM user WHERE email = ?", [
      request.email,
    ]);

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(
      request.password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    await db.query("UPDATE user SET access_token = ? WHERE user_id = ?", [
      token,
      user.user_id,
    ]);

    // If successful, return a success message (token generation can be added here)
    return res
      .status(200)
      .json({ message: "Success", data: { access_token: token } });
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
