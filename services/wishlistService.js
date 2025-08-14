const db = require('../db');

const addWishlistItem = async ({ user_id, product_id }) => {
  const result = await db.query(
    'INSERT INTO wishlist (user_id, product_id) VALUES ($1, $2) RETURNING *',
    [user_id, product_id]
  );
  return result.rows[0];
};

const getWishlistItems = async () => {
  const result = await db.query('SELECT * FROM wishlist ORDER BY added_at DESC');
  return result.rows;
};

const updateWishlistItem = async (wishlist_id, { product_id }) => {
  const result = await db.query(
    'UPDATE wishlist SET product_id = $1 WHERE wishlist_id = $2 RETURNING *',
    [product_id, wishlist_id]
  );
  return result.rows[0];
};

const deleteWishlistItem = async (wishlist_id) => {
  await db.query('DELETE FROM wishlist WHERE wishlist_id = $1', [wishlist_id]);
};

module.exports = {
  addWishlistItem,
  getWishlistItems,
  updateWishlistItem,
  deleteWishlistItem,
};
