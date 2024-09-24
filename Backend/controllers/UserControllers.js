require('dotenv').config();
const User = require('../models/Users');
const jwt =require('jsonwebtoken')
const nodemailer = require('nodemailer');



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

async function getClientLength (req, res) {
  try {
    const rowCount = await User.count(
      {where: { role: "client" }}
    );
    res.json({ rowCount });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

//////////////////////////////////////////////////////////////////////////////////////////
const sendEmail = async (req, res) => {
  const { userEmail, subject, message } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false,  },
})
console.log(process.env.EMAIL_USER, process.env.EMAIL_PASS,);


  // Email options
  const mailOptions = {
      from: userEmail,
      to: process.env.EMAIL_USER,
      subject: subject,
      text: message,
  };

  try {
      await transporter.sendMail(mailOptions);
      res.status(200).send({ message: 'Email sent successfully!' });
  } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).send({ message: 'Error sending email', error: error.message });
  }
};

module.exports = {searchByName,deleteUserById,getAllUsers,getUserById,createUser,updateUserById , sendEmail,getClientLength}
