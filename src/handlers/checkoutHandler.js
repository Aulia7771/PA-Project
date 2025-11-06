const db = require('../db');

const CheckoutHandler = {
  async getAll(request, h) {
    const { rows } = await db.query('SELECT * FROM checkout');
    return h.response(rows);
  },

  async create(request, h) {
    const { user_id, total_amount, payment_id } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO checkout (user_id, total_amount, payment_id) VALUES ($1,$2,$3) RETURNING *',
      [user_id, total_amount, payment_id]
    );
    return h.response(rows[0]).code(201);
  },
};

module.exports = CheckoutHandler;
