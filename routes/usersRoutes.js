const handler = require('../handlers/usersHandler');

module.exports = [
  {
    method: 'POST',
    path: '/users',
    handler: handler.createUserHandler,
  },
  {
    method: 'GET',
    path: '/users',
    handler: handler.getAllUsersHandler,
  },
  {
    method: 'GET',
    path: '/users/{id}',
    handler: handler.getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/users/{id}',
    handler: handler.updateUserHandler,
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handler.deleteUserHandler,
  },
];
