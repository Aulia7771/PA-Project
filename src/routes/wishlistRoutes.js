const db = require("../db");
const WishlistHandler = require("../handlers/wishlistHandler");

module.exports = [
  // {
  //   method: "GET",
  //   path: "/wishlist/{user_id}",
  //   handler: WishlistHandler.getAll,
  // },
  {
    method: "GET",
    path: "/wishlist",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM wishlist");
      return res.rows;
    },
  },
  { method: "POST", path: "/wishlist", handler: WishlistHandler.add },
  { method: "DELETE", path: "/wishlist/{id}", handler: WishlistHandler.remove },
];
