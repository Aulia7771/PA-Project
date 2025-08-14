const handler = require('../handlers/paymentHandler');

module.exports = [
  {
    method: 'POST',
    path: '/payments',
    handler: handler.createPaymentHandler,
  },
  {
    method: 'GET',
    path: '/payments',
    handler: handler.getAllPaymentsHandler,
  },
  {
    method: 'PUT',
    path: '/payments/{id}',
    handler: handler.updatePaymentHandler,
  },
  {
    method: 'DELETE',
    path: '/payments/{id}',
    handler: handler.deletePaymentHandler,
  },
];
