const db = require("../../global/config");

class helper {
  async getUserDetails(userId) {
    try {
      const query = `SELECT * FROM user WHERE user_id = ?`;
      const userData = await db.query(query, [userId]);
      return userData[0][0];
    } catch (err) {
      throw err;
    }
  }
}

module.exports = helper;
