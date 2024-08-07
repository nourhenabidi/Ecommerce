const bcrypt = require('bcrypt');
const {createUser} = require('./UserControllers');



  
  const RegisterUser = async (req, res) => {
    const { email,password} = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = {
        email,
        password: hashedPassword}
        createUser({ body: newUser }, res);
    } catch (error) {
      console.log(req.body);

      res.send(error)
    }
  };
  
  
  module.exports = {
    RegisterUser
  };

