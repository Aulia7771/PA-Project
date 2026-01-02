module.exports = (service) => ({

  getAll: async (_, h) => {
    try {
      const data = await service.getAll();
      return h.response(data).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  getById: async (request, h) => {
    try {
      const { id } = request.params;
      const data = await service.getById(id);

      if (!data) {
        return h.response({ message: "Product not found" }).code(404);
      }

      return h.response(data).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: "Internal server error" }).code(500);
    }
  },

  searchProducts: async (request, h) => {
    try {
      const data = await service.searchProducts(request.query);
      return h.response(data).code(200);
    } catch (err) {
      console.error(err);
      return h.response({ error: err.message }).code(500);
    }
  }
});
