const WishlistHandler = require("../handlers/wishlistHandler");

module.exports = [
  {
    method: "GET",
    path: "/wishlist",
    options: { auth: false },
    handler: WishlistHandler.getAll,
  },
  {
    method: "POST",
    path: "/wishlist",
    handler: WishlistHandler.add,
  },
  {
    method: "DELETE",
    path: "/wishlist/{wishlist_id}",
    handler: WishlistHandler.remove,
  },
];
