const handler = require('../handlers/wishlistHandler');

module.exports = [
  {
    method: 'POST',
    path: '/wishlist',
    handler: handler.createWishlistItem,
  },
  {
    method: 'GET',
    path: '/wishlist',
    handler: handler.getAllWishlistItems,
  },
  {
    method: 'PUT',
    path: '/wishlist/{id}',
    handler: handler.updateWishlistItem,
  },
  {
    method: 'DELETE',
    path: '/wishlist/{id}',
    handler: handler.deleteWishlistItem,
  },
];
