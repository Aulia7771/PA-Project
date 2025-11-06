const db = require('../db');
const BalanceHistoriesHandler = require("../handlers/balanceHistoriesHandler");

module.exports = [
  // {
  //   method: "GET",
  //   path: "/balance/histories/{user_id}",
  //   handler: BalanceHistoriesHandler.getAll,
  // },
  {
    method: "GET",
    path: "/balance_histories",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM balance_histories");
      return res.rows;
    },
  },
  {
    method: "POST",
    path: "/balance/histories",
    handler: BalanceHistoriesHandler.addHistory,
  },
];
