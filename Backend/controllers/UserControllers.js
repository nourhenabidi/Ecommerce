const User = require('../models/Users');
const jwt =require('jsonwebtoken')



const generateToken = (id, fullName) => {
  const expiresIn = 60 * 60 * 48;
  return jwt.sign({ id, fullName }, 'secretKey', { expiresIn: expiresIn });
};

// Get all users
async function getAllUsers(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Get user by ID
async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


// Create a new user
async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    const token = generateToken(newUser.id,newUser.fullName);
    newUser.dataValues.token=token
    console.log(newUser);
    
    res.json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Update a user by ID
async function updateUserById(req, res) {
  try {
    const { id } = req.params;
    const [updated] = await User.update(req.body, {
      where: { id },
    });
    if (updated) {
      const updatedUser = await User.findByPk(id);
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

// Delete a user by ID
async function deleteUserById(req, res) {
  try {
    const { id } = req.params;
    const deleted = await User.destroy({
      where: { id },
    });
    if (deleted) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
//searchByNameUser
async function searchByName(req, res) {
  try {
const fullName = req.params.name
const search= await User.findAll({
  where: { fullName: fullName},
})
return res.status(200).json(search)
  }
  catch (error) {
    console.error('Error');
    res.status(500).json({ error: error.message });
  }
}


module.exports = {searchByName,deleteUserById,getAllUsers,getUserById,createUser,updateUserById}
