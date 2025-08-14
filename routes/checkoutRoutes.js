const handler = require('../handlers/checkoutHandler');

module.exports = [
  {
    method: 'POST',
    path: '/checkout',
    handler: handler.createCheckoutHandler,
  },
  {
    method: 'GET',
    path: '/checkout',
    handler: handler.getAllCheckoutHandler,
  },
  {
    method: 'PUT',
    path: '/checkout/{id}',
    handler: handler.updateCheckoutHandler,
  },
  {
    method: 'DELETE',
    path: '/checkout/{id}',
    handler: handler.deleteCheckoutHandler,
  },
];
