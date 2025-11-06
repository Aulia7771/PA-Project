const db = require('../db');
const CheckoutHandler = require("../handlers/checkoutHandler");

module.exports = [
  // { method: "GET", path: "/checkout", handler: CheckoutHandler.getAll },
  {
    method: "GET",
    path: "/checkout",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM checkout");
      return res.rows;
    },
  },
  { method: "POST", path: "/checkout", handler: CheckoutHandler.create },
];
