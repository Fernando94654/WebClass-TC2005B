const { pool } = require("../config/db");

const getAllUsers = async (req, res) => {
  const result = await pool.query("SELECT id, name, email, created_at FROM users ORDER BY id ASC");
  res.json(result.rows);
};

const getUserById = async (req, res) => {
  const result = await pool.query("SELECT id, name, email, created_at FROM users WHERE id = $1", [
    req.params.id,
  ]);
  res.json(result.rows[0]);
};

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING id, name, email, created_at",
    [name, email, password]
  );

  res.status(201).json(result.rows[0]);
};

const updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4 RETURNING id, name, email, created_at",
    [name, email, password, req.params.id]
  );

  res.json(result.rows[0]);
};

const deleteUser = async (req, res) => {
  const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING id", [req.params.id]);
  res.json(result.rows[0]);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
