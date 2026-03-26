const { pool } = require("../config/db");

const login = async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT id, name, email FROM users WHERE email = $1 AND password = $2",
    [email, password]
  );

  res.json(result.rows[0]);
};

module.exports = {
  login,
};
