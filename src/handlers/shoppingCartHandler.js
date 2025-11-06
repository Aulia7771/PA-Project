const db = require('../db');

const ShoppingCartHandler = {
  async getAll(request, h) {
    const { rows } = await db.query('SELECT * FROM shopping_cart');
    return h.response(rows);
  },

  async getById(request, h) {
    const { id } = request.params;
    const { rows } = await db.query('SELECT * FROM shopping_cart WHERE id=$1', [id]);
    if (!rows.length) return h.response({ message: 'Item not found' }).code(404);
    return h.response(rows[0]);
  },

  async create(request, h) {
    const { user_id, product_id, quantity } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO shopping_cart (user_id, product_id, quantity) VALUES ($1, $2, $3) RETURNING *',
      [user_id, product_id, quantity]
    );
    return h.response(rows[0]).code(201);
  },

  async update(request, h) {
    const { id } = request.params;
    const { quantity } = request.payload;
    const { rows } = await db.query(
      'UPDATE shopping_cart SET quantity=$1 WHERE id=$2 RETURNING *',
      [quantity, id]
    );
    if (!rows.length) return h.response({ message: 'Item not found' }).code(404);
    return h.response(rows[0]);
  },

  async remove(request, h) {
    const { id } = request.params;
    await db.query('DELETE FROM shopping_cart WHERE id=$1', [id]);
    return h.response({ message: 'Item deleted' });
  },
};

module.exports = ShoppingCartHandler;
