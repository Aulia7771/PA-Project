const ShoppingCartService = require('../services/shoppingCartService');

module.exports = {
  createCartItem: async (request, h) => {
    const newItem = await ShoppingCartService.addItem(request.payload);
    return h.response(newItem).code(201);
  },

  getAllCartItems: async (_, h) => {
    const items = await ShoppingCartService.getItems();
    return h.response(items);
  },

  updateCartItem: async (request, h) => {
    const { id } = request.params;
    const updated = await ShoppingCartService.updateItem(id, request.payload);
    if (!updated) return h.response({ message: 'Item not found' }).code(404);
    return h.response(updated);
  },

  deleteCartItem: async (request, h) => {
    const { id } = request.params;
    await ShoppingCartService.deleteItem(id);
    return h.response({ message: 'Item deleted' }).code(200);
  },
};
