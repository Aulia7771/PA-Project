const UsersService = require('../services/usersService');

module.exports = {
  createUserHandler: async (request, h) => {
    const newUser = await UsersService.createUser(request.payload);
    return h.response(newUser).code(201);
  },

  getAllUsersHandler: async (_, h) => {
    const users = await UsersService.getAllUsers();
    return h.response(users);
  },

  getUserByIdHandler: async (request, h) => {
    const { id } = request.params;
    const user = await UsersService.getUserById(id);
    if (!user) {
      return h.response({ message: 'User not found' }).code(404);
    }
    return h.response(user);
  },

  updateUserHandler: async (request, h) => {
    const { id } = request.params;
    const updated = await UsersService.updateUser(id, request.payload);
    if (!updated) {
      return h.response({ message: 'User not found' }).code(404);
    }
    return h.response(updated);
  },

  deleteUserHandler: async (request, h) => {
    const { id } = request.params;
    await UsersService.deleteUser(id);
    return h.response({ message: 'User deleted' });
  },
};
