module.exports = (service) => ({

  checkout: async (request, h) => {
    try {
      const result = await service.checkout(request.payload);
      return h.response(result).code(200);
    } catch (err) {
      return h.response({ error: err.message }).code(400);
    }
  },

  getAll: async (request, h) => {
    try {
      const { rows } = await request.server.app.db.query(
        'SELECT * FROM checkout ORDER BY checkout_id DESC'
      );
      return h.response(rows);
    } catch (err) {
      return h.response({ error: 'Internal server error' }).code(500);
    }
  },

  getByUser: async (request, h) => {
    try {
      const { user_id } = request.params;
      const rows = await service.getAllByUser(user_id);
      return h.response(rows);
    } catch (err) {
      return h.response({ error: err.message }).code(400);
    }
  }
});
