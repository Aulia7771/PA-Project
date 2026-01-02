module.exports = (service) => {
  const handler = require('../handlers/checkoutHandler')(service);

  return [
    {
      method: 'GET',
      path: '/checkout',
      options: { auth: false },
      handler: handler.getAll
    },
    {
      method: 'GET',
      path: '/checkout/user/{user_id}',
      options: { auth: false },
      handler: handler.getByUser
    },
    {
      method: 'POST',
      path: '/checkout',
      options: { auth: false },
      handler: handler.checkout
    }
  ];
};
