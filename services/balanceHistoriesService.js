const db = require('../db');

const createHistory = async ({ user_id, amount, transaction_type, description }) => {
  const result = await db.query(
    `INSERT INTO balance_histories (user_id, amount, transaction_type, description)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [user_id, amount, transaction_type, description]
  );
  return result.rows[0];
};

const getAllHistories = async () => {
  const result = await db.query(
    'SELECT * FROM balance_histories ORDER BY created_at DESC'
  );
  return result.rows;
};

const getHistoryById = async (id) => {
  const result = await db.query(
    'SELECT * FROM balance_histories WHERE history_id = $1',
    [id]
  );
  return result.rows[0];
};

const updateHistory = async (id, { user_id, amount, transaction_type, description }) => {
  const result = await db.query(
    `UPDATE balance_histories
     SET user_id = $1, amount = $2, transaction_type = $3, description = $4
     WHERE history_id = $5 RETURNING *`,
    [user_id, amount, transaction_type, description, id]
  );
  return result.rows[0];
};

const deleteHistory = async (id) => {
  await db.query('DELETE FROM balance_histories WHERE history_id = $1', [id]);
};

module.exports = {
  createHistory,
  getAllHistories,
  getHistoryById,
  updateHistory,
  deleteHistory,
};
