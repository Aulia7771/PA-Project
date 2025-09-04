const PaymentService = require('../services/paymentService');

module.exports = {
  createPaymentHandler: async (request, h) => {
    const newPayment = await PaymentService.createPayment(request.payload);
    return h.response(newPayment).code(201);
  },

  getAllPaymentsHandler: async (_, h) => {
    const payments = await PaymentService.getAllPayments();
    return h.response(payments);
  },

  updatePaymentHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await PaymentService.updatePayment(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Payment not found' }).code(404);
    }
    return h.response(updated);
  },

  deletePaymentHandler: async (request, h) => {
    const { id } = request.params;
    await PaymentService.deletePayment(id);
    return h.response({ message: 'Payment deleted' });
  },
};
