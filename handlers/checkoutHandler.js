const CheckoutService = require('../services/checkoutService');

module.exports = {
  createCheckoutHandler: async (request, h) => {
    const newCheckout = await CheckoutService.createCheckout(request.payload);
    return h.response(newCheckout).code(201);
  },

  getAllCheckoutHandler: async (_, h) => {
    const data = await CheckoutService.getAllCheckouts();
    return h.response(data);
  },

  updateCheckoutHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await CheckoutService.updateCheckout(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Checkout not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteCheckoutHandler: async (request, h) => {
    const { id } = request.params;
    await CheckoutService.deleteCheckout(id);
    return h.response({ message: 'Checkout deleted' });
  },
};
