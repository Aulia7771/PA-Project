const BalanceService = require('../services/balanceService');

module.exports = {
  createBalanceHandler: async (request, h) => {
    const newBalance = await BalanceService.createBalance(request.payload);
    return h.response(newBalance).code(201);
  },

  getAllBalancesHandler: async (_, h) => {
    const balances = await BalanceService.getAllBalances();
    return h.response(balances);
  },

  getBalanceByIdHandler: async (request, h) => {
    const { id } = request.params;
    const balance = await BalanceService.getBalanceById(id);
    if (!balance) {
      return h.response({ message: 'Balance not found' }).code(404);
    }
    return h.response(balance);
  },

  updateBalanceHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await BalanceService.updateBalance(id, request.payload);
    if (!updated) {
      return h.response({ message: 'Balance not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteBalanceHandler: async (request, h) => {
    const { id } = request.params;
    await BalanceService.deleteBalance(id);
    return h.response({ message: 'Balance deleted' });
  },
};
