module.exports = (service) => ({

  // GET /shopping_cart
  getAll: async (_request, h) => {
    try {
      const rows = await service.getAll();
      return h.response(rows).code(200);
    } catch (err) {
      console.error("ERROR getAll:", err);
      return h.response({ message: "Internal server error" }).code(500);
    }
  },

  // GET /shopping_cart/{id}
  getById: async (request, h) => {
    try {
      const result = await service.getById(request.params.id);
      if (!result) {
        return h.response({ message: "Not found" }).code(404);
      }
      return h.response(result).code(200);
    } catch (err) {
      console.error("ERROR getById:", err);
      return h.response({ message: "Internal server error" }).code(500);
    }
  },

  // POST /shopping_cart 
  create: async (request, h) => {
    try {
      const result = await service.add(request.payload);
      return h.response({
        status: "success",
        message: "Berhasil ditambahkan ke shopping cart",
        data: result
      }).code(201);
    } catch (err) {
      return h.response({
        status: "fail",
        message: err.message,
        stock: err.stock
      }).code(err.statusCode || 500);
    }
  },

  // PUT /shopping_cart/{id}
  update: async (request, h) => {
    try {
      const result = await service.update(
        request.params.id,
        request.payload
      );
      return h.response(result).code(200);
    } catch (err) {
      console.error("ERROR update:", err);
      return h.response({ message: "Internal server error" }).code(500);
    }
  },

  // DELETE /shopping_cart/{id}
  delete: async (request, h) => {
    try {
      await service.delete(request.params.id);
      return h.response({ message: "Deleted" }).code(200);
    } catch (err) {
      console.error("ERROR delete:", err);
      return h.response({ message: "Internal server error" }).code(500);
    }
  }

});
