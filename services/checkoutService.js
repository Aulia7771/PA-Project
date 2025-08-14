const db = require('../db');

const createCheckout = async ({ user_id, total_amount, status }) => {
  const result = await db.query(
    `INSERT INTO checkout (user_id, total_amount, status) 
     VALUES ($1, $2, $3) RETURNING *`,
    [user_id, total_amount, status || 'Pending']
  );
  return result.rows[0];
};

const getAllCheckouts = async () => {
  const result = await db.query('SELECT * FROM checkout ORDER BY checkout_at DESC');
  return result.rows;
};

const updateCheckout = async (checkout_id, { total_amount, status }) => {
  const result = await db.query(
    `UPDATE checkout 
     SET total_amount = $1, status = $2, updated_at = CURRENT_TIMESTAMP 
     WHERE checkout_id = $3 RETURNING *`,
    [total_amount, status, checkout_id]
  );
  return result.rows[0];
};

const deleteCheckout = async (checkout_id) => {
  await db.query('DELETE FROM checkout WHERE checkout_id = $1', [checkout_id]);
};

module.exports = {
  createCheckout,
  getAllCheckouts,
  updateCheckout,
  deleteCheckout,
};
