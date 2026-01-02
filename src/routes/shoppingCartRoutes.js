module.exports = (service) => {
  const handler = require("../handlers/shoppingCartHandler")(service);

  return [
    {
      method: "GET",
      path: "/shopping_cart",
      handler: handler.getAll,
      options: { auth: false }
    },

    {
      method: "GET",
      path: "/shopping_cart/{id}",
      handler: handler.getById,
      options: { auth: false }
    },

    {
      method: "GET",
      path: "/shopping_cart/user/{user_id}",
      handler: async (request, h) => {
        try {
          const rows = await service.getByUser(request.params.user_id);
          return h.response(rows).code(200);
        } catch (err) {
          console.error("ERROR getByUser:", err);
          return h.response({ message: "Internal server error" }).code(500);
        }
      },
      options: { auth: false }
    },

    {
      method: "POST",
      path: "/shopping_cart",
      handler: handler.create,
      options: { auth: false }
    },

    {
      method: "PUT",
      path: "/shopping_cart/{id}",
      handler: handler.update,
      options: { auth: false }
    },

    {
      method: "DELETE",
      path: "/shopping_cart/{id}",
      handler: handler.delete,
      options: { auth: false }
    }

  ];
};

