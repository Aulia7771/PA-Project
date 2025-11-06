const db = require('../db');
const CheckoutItemHandler = require("../handlers/checkoutItemsHandler");

module.exports = [
  // {
  //   method: "GET",
  //   path: "/checkout/{checkout_id}/items",
  //   handler: CheckoutItemHandler.getByCheckout,
  // },
  {
    method: "GET",
    path: "/checkout_items",
    options: {
      auth: false,
    },
    handler: async (request, h) => {
      const res = await db.query("SELECT * FROM checkout_items");
      return res.rows;
    },
  },
  { method: "POST", path: "/checkout/items", handler: CheckoutItemHandler.add },
];
