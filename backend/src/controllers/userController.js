const { pool } = require("../config/db");

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, created_at FROM users ORDER BY id ASC");
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const getUserById = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [
      req.params.id,
    ]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Faltan datos" });
    return;
  }

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
      [name, email, password]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email, created_at",
      [name, email, password, req.params.id]
    );

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [req.params.id]);

    if (result.rows.length === 0) {
      res.status(404).json({ message: "Usuario no encontrado" });
      return;
    }

    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
