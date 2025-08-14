const handler = require('../handlers/productHandler');

module.exports = [
  {
    method: 'POST',
    path: '/products',
    handler: handler.createProductHandler,
  },
  {
    method: 'GET',
    path: '/products',
    handler: handler.getAllProductsHandler,
  },
  {
    method: 'GET',
    path: '/products/{id}',
    handler: handler.getProductByIdHandler,
  },
  {
    method: 'PUT',
    path: '/products/{id}',
    handler: handler.updateProductHandler,
  },
  {
    method: 'DELETE',
    path: '/products/{id}',
    handler: handler.deleteProductHandler,
  },
];
