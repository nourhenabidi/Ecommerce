const express = require('express');
const UserAuthcontRouter = express.Router();
const AuthControllerUser =require('../controllers/userAuthCont')


UserAuthcontRouter.get("/login", AuthControllerUser.LoginUser);
UserAuthcontRouter.post("/signup", AuthControllerUser.RegisterUser)




module.exports = UserAuthcontRouter
