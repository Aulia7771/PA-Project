const handler = require('../handlers/shoppingCartHandler');

module.exports = [
  {
    method: 'POST',
    path: '/cart',
    handler: handler.createCartItem,
  },
  {
    method: 'GET',
    path: '/cart',
    handler: handler.getAllCartItems,
  },
  {
    method: 'PUT',
    path: '/cart/{id}',
    handler: handler.updateCartItem,
  },
  {
    method: 'DELETE',
    path: '/cart/{id}',
    handler: handler.deleteCartItem,
  },
];
