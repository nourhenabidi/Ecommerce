const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = require('../models/Users');
const {createUser} = require('./UserControllers');

const generateToken = (id,email) => {
    const expiresIn = 60 * 60 * 48;//2days
    return jwt.sign({ id, email}, 'sy_secret_key_2023$#@!', { expiresIn: expiresIn });
  };

  
  
  const LoginUser = async(req, res) => {
    const {emailCompany,passwordCompany}=req.body;
    try {
         const result= await user.findOne({ where :{emailCompany:emailCompany}})
         if(result ===null) res.send("email not found")
         else {
          const verif=result.dataValues.passwordCompany
          const passwordMatch = await bcrypt.compare(passwordCompany,verif)

          if(passwordMatch){
             const token=generateToken(result.dataValues.id)  
             result.dataValues.token=token
            res.send(result.dataValues)
          }
          else{
            res.send("Wrong Passeword")
          }
          
      }
    
    }
    catch (error) {res.status(500).json(error)}
};
 
  const RegisterUser = async (req, res) => {
    const {email,password} = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        email,
        password: hashedPassword}
        console.log("befoore");
        
        createUser({ body: newUser }, res);
    } catch (error) {

      res.send(error.message)
    }
  };
  
  
  module.exports = {
    LoginUser , RegisterUser
  };