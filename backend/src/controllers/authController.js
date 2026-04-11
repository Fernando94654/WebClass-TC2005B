const { pool } = require("../config/db");

const login = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Faltan datos" });
    }

    const result = await pool.query(
      "SELECT id, name, email, created_at FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    return res.json(result.rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  login,
};
