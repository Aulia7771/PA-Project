const db = require('../db');

const PaymentHandler = {
  async getAll(request, h) {
    try {
      const { rows } = await db.query('SELECT * FROM payment ORDER BY payment_id DESC');
      return h.response(rows);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async create(request, h) {
    try {
      const { checkout_id, user_id, amount, payment_method } = request.payload;

      const { rows } = await db.query(
        `INSERT INTO payment (checkout_id, user_id, amount, payment_method, payment_status)
         VALUES ($1, $2, $3, $4, 'pending')
         RETURNING *`,
        [checkout_id, user_id, amount, payment_method]
      );

      return h.response(rows[0]).code(201);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  async updateStatus(request, h) {
    try {
      const { payment_id } = request.params;
      const { payment_status } = request.payload;

      const { rows } = await db.query(
        `UPDATE payment 
         SET payment_status=$1, paid_at = CASE WHEN $1='paid' THEN NOW() ELSE paid_at END
         WHERE payment_id=$2
         RETURNING *`,
        [payment_status, payment_id]
      );

      if (!rows.length)
        return h.response({ error: 'Payment not found' }).code(404);

      return h.response(rows[0]);
    } catch (err) {
      console.error(err);
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },
};

module.exports = PaymentHandler;
