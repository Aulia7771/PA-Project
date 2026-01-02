const pool = require('../db');

class PaymentService {
  async getAll() {
    const res = await pool.query(
      'SELECT * FROM payment ORDER BY payment_id DESC'
    );
    return res.rows;
  }

  async create({ checkout_id, user_id, amount, payment_method }) {
    const res = await pool.query(
      `INSERT INTO payment (checkout_id, user_id, amount, payment_method, payment_status)
       VALUES ($1, $2, $3, $4, 'pending')
       RETURNING *`,
      [checkout_id, user_id, amount, payment_method]
    );
    return res.rows[0];
  }

  async updateStatus(payment_id, payment_status) {
    const res = await pool.query(
      `UPDATE payment 
       SET payment_status=$1, paid_at = CASE WHEN $1='paid' THEN NOW() ELSE paid_at END
       WHERE payment_id=$2
       RETURNING *`,
      [payment_status, payment_id]
    );
    return res.rows[0];
  }
}

module.exports = new PaymentService();
