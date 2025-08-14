const handler = require('../handlers/checkoutItemHandler');

module.exports = [
  {
    method: 'POST',
    path: '/checkout-items',
    handler: handler.createCheckoutItemHandler,
  },
  {
    method: 'GET',
    path: '/checkout-items',
    handler: handler.getAllCheckoutItemHandler,
  },
  {
    method: 'PUT',
    path: '/checkout-items/{id}',
    handler: handler.updateCheckoutItemHandler,
  },
  {
    method: 'DELETE',
    path: '/checkout-items/{id}',
    handler: handler.deleteCheckoutItemHandler,
  },
];
