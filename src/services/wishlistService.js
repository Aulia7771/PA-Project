const pool = require('../db');

class WishlistService {
  async getByUser(user_id) {
    const res = await pool.query('SELECT * FROM wishlist WHERE user_id=$1', [user_id]);
    return res.rows;
  }

  async add({ user_id, product_id }) {
    const res = await pool.query(
      `INSERT INTO wishlist (user_id, product_id)
       VALUES ($1, $2) RETURNING *`,
      [user_id, product_id]
    );
    return res.rows[0];
  }

  async delete(wishlist_id) {
    await pool.query('DELETE FROM wishlist WHERE wishlist_id=$1', [wishlist_id]);
  }
}

module.exports = new WishlistService();
