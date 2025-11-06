const db = require('../db');
const PaymentHandler = require("../handlers/paymentHandler");

module.exports = [
  {
    method: "GET",
    path: "/payment",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM payment");
      return res.rows;
    },
  },
  // { method: "GET", path: "/payment", handler: PaymentHandler.getAll },
  { method: "POST", path: "/payment", handler: PaymentHandler.create },
  {
    method: "PUT",
    path: "/payment/{id}",
    handler: PaymentHandler.updateStatus,
  },
];
