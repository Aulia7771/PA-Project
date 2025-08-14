const WishlistService = require('../services/wishlistService');

module.exports = {
  createWishlistItem: async (request, h) => {
    const newItem = await WishlistService.addWishlistItem(request.payload);
    return h.response(newItem).code(201);
  },

  getAllWishlistItems: async (_, h) => {
    const items = await WishlistService.getWishlistItems();
    return h.response(items);
  },

  updateWishlistItem: async (request, h) => {
    const { id } = request.params;
    const updated = await WishlistService.updateWishlistItem(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Item not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteWishlistItem: async (request, h) => {
    const { id } = request.params;
    await WishlistService.deleteWishlistItem(id);
    return h.response({ message: 'Item deleted' });
  },
};
