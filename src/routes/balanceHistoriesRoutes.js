const BalanceHistoriesHandler = require("../handlers/balanceHistoriesHandler");

module.exports = [
  {
    method: "GET",
    path: "/balance_histories",
    options: { auth: false },
    handler: BalanceHistoriesHandler.getAllHistories,
  },

  {
    method: "GET",
    path: "/balance_histories/{user_id}",
    options: { auth: false },
    handler: BalanceHistoriesHandler.getByUser,
  },

  {
    method: "POST",
    path: "/balance_histories",
    options: { auth: false },
    handler: BalanceHistoriesHandler.addHistory,
  },
];
