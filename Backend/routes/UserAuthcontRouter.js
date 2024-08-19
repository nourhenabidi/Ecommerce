const express = require('express');
const UserAuthcontRouter = express.Router();
const AuthControllerUser =require('../controllers/authentificationUser')


UserAuthcontRouter.get("/login", AuthControllerUser.loginUser);
UserAuthcontRouter.post("/signup", AuthControllerUser.signUpUser)





module.exports = UserAuthcontRouter
