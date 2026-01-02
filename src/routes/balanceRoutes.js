const BalanceHandler = require("../handlers/balanceHandler");

module.exports = [
  {
    method: "GET",
    path: "/balance",
    options: { auth: false },
    handler: BalanceHandler.getAll,
  },

  {
    method: "GET",
    path: "/balance/{user_id}",
    options: { auth: false },
    handler: BalanceHandler.getBalance,
  },

  {
    method: "POST",
    path: "/balance/topup",
    options: { auth: false },
    handler: BalanceHandler.topUp,
  },

  {
    method: "POST",
    path: "/balance/debit",
    options: { auth: false },
    handler: BalanceHandler.debit,
  }
];
