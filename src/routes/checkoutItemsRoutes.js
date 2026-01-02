const CheckoutItemHandler = require("../handlers/checkoutItemsHandler");

module.exports = [
  {
    method: "GET",
    path: "/checkout_items",
    options: { auth: false },
    handler: CheckoutItemHandler.getAll,
  },

  {
    method: "GET",
    path: "/checkout/{checkout_id}/items",
    options: { auth: false },
    handler: CheckoutItemHandler.getByCheckout,
  },

  {
    method: "POST",
    path: "/checkout_items",
    options: { auth: false },
    handler: CheckoutItemHandler.add,
  }
];
