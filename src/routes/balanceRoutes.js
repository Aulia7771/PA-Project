const db = require("../db");
const BalanceHandler = require("../handlers/balanceHandler");

module.exports = [
  // {
  //   method: "GET",
  //   path: "/balance/{user_id}",
  //   handler: BalanceHandler.getBalance,
  // },
  {
    method: "GET",
    path: "/balance",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM balance");
      return res.rows;
    },
  },
  { method: "POST", path: "/balance/topup", handler: BalanceHandler.topUp },
];
