const db = require('../db');
const WishlistService = require('../services/wishlistService');

const WishlistHandler = {

  async getAll(request, h) {
    const { user_id } = request.query;

    if (!user_id) {
      const { rows } = await db.query('SELECT * FROM wishlist ORDER BY wishlist_id ASC');
      return h.response(rows);
    }

    const items = await WishlistService.getByUser(user_id);
    return h.response(items);
  },

  async add(request, h) {
    const { user_id, product_id } = request.payload;

    const item = await WishlistService.add({
      user_id,
      product_id
    });

    return h.response(item).code(201);
  },

  async remove(request, h) {
    const { wishlist_id } = request.params;

    const deleted = await WishlistService.delete(wishlist_id);

    if (!deleted)
      return h.response({ message: "Item not found" }).code(404);

    return h.response({ message: "Removed from wishlist" });
  },

};

module.exports = WishlistHandler;
