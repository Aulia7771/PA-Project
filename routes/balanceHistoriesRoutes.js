const handler = require('../handlers/balanceHistoriesHandler');

module.exports = [
  {
    method: 'POST',
    path: '/balance-histories',
    handler: handler.createHistoryHandler,
  },
  {
    method: 'GET',
    path: '/balance-histories',
    handler: handler.getAllHistoriesHandler,
  },
  {
    method: 'GET',
    path: '/balance-histories/{id}',
    handler: handler.getHistoryByIdHandler,
  },
  {
    method: 'PUT',
    path: '/balance-histories/{id}',
    handler: handler.updateHistoryHandler,
  },
  {
    method: 'DELETE',
    path: '/balance-histories/{id}',
    handler: handler.deleteHistoryHandler,
  },
];
