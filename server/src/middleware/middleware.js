const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

const validateUserAccessToken = async (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    token = token.split(" ")[1];

    if (!token) {
      return res.status(403).json({ message: "No token provided." });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(401)
          .json({ message: "Failed to authenticate token." });
      }

      // If token is valid, save decoded info to request for use in other routes
      req.user = decoded;
      next();
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error." });
  }
};

module.exports = { validateUserAccessToken };
