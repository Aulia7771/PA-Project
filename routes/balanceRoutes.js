const handler = require('../handlers/balanceHandler');

module.exports = [
  {
    method: 'POST',
    path: '/balances',
    handler: handler.createBalanceHandler,
  },
  {
    method: 'GET',
    path: '/balances',
    handler: handler.getAllBalancesHandler,
  },
  {
    method: 'GET',
    path: '/balances/{id}',
    handler: handler.getBalanceByIdHandler,
  },
  {
    method: 'PUT',
    path: '/balances/{id}',
    handler: handler.updateBalanceHandler,
  },
  {
    method: 'DELETE',
    path: '/balances/{id}',
    handler: handler.deleteBalanceHandler,
  },
];
