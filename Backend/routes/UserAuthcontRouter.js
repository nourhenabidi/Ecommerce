const express = require('express');
const UserAuthcontRouter = express.Router();
const AuthControllerUser =require('../controllers/authentificationUser')


UserAuthcontRouter.post("/login", AuthControllerUser.loginUser);
UserAuthcontRouter.post("/signup", AuthControllerUser.signUpUser)





module.exports = UserAuthcontRouter
