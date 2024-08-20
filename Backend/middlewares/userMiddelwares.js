const jwt = require('jsonwebtoken');


const  verifyUser=(req, res, next)=> {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token not provided' });
  }

  jwt.verify(token, 'my_secret_key_2023$#@!', (err, decoded) => {
    if (err) {
      
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
    req.user = decoded
    next();
  });

};

module.exports ={verifyUser};