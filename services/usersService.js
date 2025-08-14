const db = require('../db');

const createUser = async ({ username, email, password_hash, full_name, address, country_code, phone_number }) => {
  const result = await db.query(
    `INSERT INTO users (username, email, password_hash, full_name, address, country_code, phone_number)
     VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
    [username, email, password_hash, full_name, address, country_code, phone_number]
  );
  return result.rows[0];
};

const getAllUsers = async () => {
  const result = await db.query('SELECT * FROM users ORDER BY user_id ASC');
  return result.rows;
};

const getUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE user_id = $1', [id]);
  return result.rows[0];
};

const updateUser = async (id, { username, email, password_hash, full_name, address, country_code, phone_number }) => {
  const result = await db.query(
    `UPDATE users
     SET username = $1, email = $2, password_hash = $3, full_name = $4, address = $5, country_code = $6, phone_number = $7
     WHERE user_id = $8 RETURNING *`,
    [username, email, password_hash, full_name, address, country_code, phone_number, id]
  );
  return result.rows[0];
};

const deleteUser = async (id) => {
  await db.query('DELETE FROM users WHERE user_id = $1', [id]);
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};
