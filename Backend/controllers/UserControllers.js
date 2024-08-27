require('dotenv').config();
const User = require('../models/Users');
const jwt =require('jsonwebtoken')
const { google } = require('googleapis');
const nodemailer = require('nodemailer');

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;
console.log('Type of CLIENT_ID:', typeof CLIENT_ID);
console.log('Type of CLIENT_SECRET:', typeof CLIENT_SECRET);
console.log('Type of REDIRECT_URI:', typeof REDIRECT_URI);
const OAuth2 = google.auth.OAuth2;


const SCOPES = ['https://mail.google.com/'];
console.log('Initializing oauth2Client');

const oauth2Client = new OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);
// oauth2Client.re
oauth2Client.setCredentials({
  refresh_token:
    process.env.REFRESH_TOKEN,
});

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
const authUser = (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES,
  });
  res.redirect(authUrl);
};

const handleAuthCallback = async (req, res) => {
  const code = req.query.code;
  const { tokens } = await oauth2Client.getToken(code);
  req.session.tokens = tokens;
  res.send('Authentication successful! You can now send emails.');
};

const sendEmail = async (req, res) => {
  if (!req.session.tokens) {
      return res.redirect('/auth');
  }

  oauth2Client.setCredentials(req.session.tokens);
  const accessToken = await oauth2Client.getAccessToken();

  const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          type: 'OAuth2',
          user: 'your-email@gmail.com',
          clientId: CLIENT_ID,
          clientSecret: CLIENT_SECRET,
          refreshToken: req.session.tokens.refresh_token,
          accessToken: accessToken.token,
      },
  });

  const mailOptions = {
      from: 'YOUR_EMAIL@gmail.com',
      to: 'TO_EMAIL@gmail.com',
      subject: 'Nodemailer Test',
      text: 'Hello from Nodemailer!',
      html: '<h1>Hello from Nodemailer!</h1>',
  };

  try {
      const result = await transport.sendMail(mailOptions);
      res.send('Email sent successfully: ' + result);
  } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).send('Error sending email');
  }
};

module.exports = {searchByName,deleteUserById,getAllUsers,getUserById,createUser,updateUserById ,authUser,handleAuthCallback, sendEmail}
