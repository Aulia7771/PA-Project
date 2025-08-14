const BalanceHistoriesService = require('../services/balanceHistoriesService');

module.exports = {
  createHistoryHandler: async (request, h) => {
    const newHistory = await BalanceHistoriesService.createHistory(request.payload);
    return h.response(newHistory).code(201);
  },

  getAllHistoriesHandler: async (_, h) => {
    const histories = await BalanceHistoriesService.getAllHistories();
    return h.response(histories);
  },

  getHistoryByIdHandler: async (request, h) => {
    const { id } = request.params;
    const history = await BalanceHistoriesService.getHistoryById(id);
    if (!history) {
      return h.response({ message: 'History not found' }).code(404);
    }
    return h.response(history);
  },

  updateHistoryHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await BalanceHistoriesService.updateHistory(id, request.payload);
    if (!updated) {
      return h.response({ message: 'History not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteHistoryHandler: async (request, h) => {
    const { id } = request.params;
    await BalanceHistoriesService.deleteHistory(id);
    return h.response({ message: 'History deleted' });
  },
};
