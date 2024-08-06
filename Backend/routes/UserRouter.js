const UserRouter = require('express').Router();
const UserController = require('../controllers/UserControllers');


// GET all users
UserRouter.get('/users/getall', UserController.getAllUsers);
// GET user by ID
UserRouter.get('/users/:id', UserController.getUserById);
//search user by name
 UserRouter.get('/users/getName/:name', UserController.searchByName);
// POST create a new user
UserRouter.post('/users/add', UserController.createUser);
// PUT update a user by ID
UserRouter.put('/users/:id', UserController.updateUserById);
// DELETE a user by ID
UserRouter.delete('/users/delete/:id', UserController.deleteUserById);

module.exports=UserRouter 