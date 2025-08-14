const db = require('../db');

const createPayment = async ({ checkout_id, payment_method, payment_status }) => {
  const result = await db.query(
    `INSERT INTO payment (checkout_id, payment_method, payment_status)
     VALUES ($1, $2, $3) RETURNING *`,
    [checkout_id, payment_method, payment_status]
  );
  return result.rows[0];
};

const getAllPayments = async () => {
  const result = await db.query('SELECT * FROM payment ORDER BY paid_at DESC');
  return result.rows;
};

const updatePayment = async (payment_id, { payment_method, payment_status }) => {
  const result = await db.query(
    `UPDATE payment
     SET payment_method = $1, payment_status = $2
     WHERE payment_id = $3 RETURNING *`,
    [payment_method, payment_status, payment_id]
  );
  return result.rows[0];
};

const deletePayment = async (payment_id) => {
  await db.query('DELETE FROM payment WHERE payment_id = $1', [payment_id]);
};

module.exports = {
  createPayment,
  getAllPayments,
  updatePayment,
  deletePayment,
};
