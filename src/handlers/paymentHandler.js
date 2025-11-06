const db = require('../db');

const PaymentHandler = {
  async getAll(request, h) {
    const { rows } = await db.query('SELECT * FROM payment');
    return h.response(rows);
  },

  async create(request, h) {
    const { user_id, amount, method, status } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO payment (user_id, amount, method, status) VALUES ($1,$2,$3,$4) RETURNING *',
      [user_id, amount, method, status]
    );
    return h.response(rows[0]).code(201);
  },

  async updateStatus(request, h) {
    const { id } = request.params;
    const { status } = request.payload;
    const { rows } = await db.query('UPDATE payment SET status=$1 WHERE id=$2 RETURNING *', [status, id]);
    return h.response(rows[0]);
  },
};

module.exports = PaymentHandler;
