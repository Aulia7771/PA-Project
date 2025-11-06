const db = require('../db');

const WishlistHandler = {
  async getAll(request, h) {
    const { user_id } = request.params;
    const { rows } = await db.query('SELECT * FROM wishlist WHERE user_id=$1', [user_id]);
    return h.response(rows);
  },

  async add(request, h) {
    const { user_id, product_id } = request.payload;
    const { rows } = await db.query(
      'INSERT INTO wishlist (user_id, product_id) VALUES ($1,$2) RETURNING *',
      [user_id, product_id]
    );
    return h.response(rows[0]).code(201);
  },

  async remove(request, h) {
    const { id } = request.params;
    await db.query('DELETE FROM wishlist WHERE id=$1', [id]);
    return h.response({ message: 'Removed from wishlist' });
  },
};

module.exports = WishlistHandler;
