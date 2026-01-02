const db = require('../db');

class WishlistService {

  async getByUser(user_id) {
    const res = await db.query(
      `SELECT * FROM wishlist WHERE user_id = $1 ORDER BY wishlist_id ASC`,
      [user_id]
    );
    return res.rows;
  }

  async add({ user_id, product_id }) {
    const res = await db.query(
      `INSERT INTO wishlist (user_id, product_id)
       VALUES ($1, $2)
       RETURNING *`,
      [user_id, product_id]
    );
    return res.rows[0];
  }

  async delete(wishlist_id) {
    const res = await db.query(
      `DELETE FROM wishlist WHERE wishlist_id = $1 RETURNING wishlist_id`,
      [wishlist_id]
    );
    return res.rowCount > 0;
  }

}

module.exports = new WishlistService();
