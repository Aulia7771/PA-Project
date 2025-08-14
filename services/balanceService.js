const db = require('../db');

const createBalance = async ({ user_id, balance_amount }) => {
  const result = await db.query(
    `INSERT INTO balance (user_id, balance_amount)
     VALUES ($1, $2) RETURNING *`,
    [user_id, balance_amount]
  );
  return result.rows[0];
};

const getAllBalances = async () => {
  const result = await db.query('SELECT * FROM balance ORDER BY created_at DESC');
  return result.rows;
};

const getBalanceById = async (id) => {
  const result = await db.query('SELECT * FROM balance WHERE balance_id = $1', [id]);
  return result.rows[0];
};

const updateBalance = async (id, { user_id, balance_amount }) => {
  const result = await db.query(
    `UPDATE balance
     SET user_id = $1, balance_amount = $2, updated_at = CURRENT_TIMESTAMP
     WHERE balance_id = $3 RETURNING *`,
    [user_id, balance_amount, id]
  );
  return result.rows[0];
};

const deleteBalance = async (id) => {
  await db.query('DELETE FROM balance WHERE balance_id = $1', [id]);
};

module.exports = {
  createBalance,
  getAllBalances,
  getBalanceById,
  updateBalance,
  deleteBalance,
};
