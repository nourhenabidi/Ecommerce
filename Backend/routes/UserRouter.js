const UserRouter = require('express').Router();
const UserController = require('../controllers/UserControllers');

// GET all users
UserRouter.get('/getall', UserController.getAllUsers);
// GET user by ID
UserRouter.get('/get/:id', UserController.getUserById);
//search user by name
 UserRouter.get('/getName/:name', UserController.searchByName);
// POST create a new user
UserRouter.post('/add', UserController.createUser);
// PUT update a user by ID
UserRouter.put('/update/:id', UserController.updateUserById);
// DELETE a user by ID
UserRouter.delete('/delete/:id', UserController.deleteUserById);
// send email
UserRouter.post('/sendEmail', UserController.sendEmail);

module.exports=UserRouter 