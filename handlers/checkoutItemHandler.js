const CheckoutItemService = require('../services/checkoutItemService');

module.exports = {
  createCheckoutItemHandler: async (request, h) => {
    const newItem = await CheckoutItemService.createCheckoutItem(request.payload);
    return h.response(newItem).code(201);
  },

  getAllCheckoutItemHandler: async (_, h) => {
    const items = await CheckoutItemService.getAllCheckoutItems();
    return h.response(items);
  },

  updateCheckoutItemHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await CheckoutItemService.updateCheckoutItem(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Checkout item not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteCheckoutItemHandler: async (request, h) => {
    const { id } = request.params;
    await CheckoutItemService.deleteCheckoutItem(id);
    return h.response({ message: 'Checkout item deleted' });
  },
};
