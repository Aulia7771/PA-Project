const db = require('../db');
const PaymentHandler = require("../handlers/paymentHandler");

module.exports = [
  {
    method: "GET",
    path: "/payment",
    options: { auth: false },
    handler: PaymentHandler.getAll,
  },

  {
    method: "POST",
    path: "/payment",
    options: { auth: false },
    handler: PaymentHandler.create,
  },

  {
    method: "PUT",
    path: "/payment/{payment_id}",
    options: { auth: false },
    handler: PaymentHandler.updateStatus,
  },
];
