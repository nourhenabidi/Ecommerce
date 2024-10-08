const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'my_secret_key_2023$#@!';
const User = require('../models/Users');

function generateToken(user) {
    const expire = 60 * 60 * 48; // Two days
    return jwt.sign({ user: { id: user.id, email: user.email, role: user.role } }, secretKey, { expiresIn: expire });
}

const signUpUser = async (req, res) => {
    const { email, password, role = 'client' } = req.body; // Default to 'client' if not provided
    try {
        // Check if the email already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists. Please use a different email.' });
        }

        // Hash the password and create a new user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            email,
            password: hashedPassword,
            role, // Include role
        };
        const createdUser = await User.create(newUser);

        // Generate token for the new user
        const token = generateToken(createdUser);

        res.status(201).json({ message: 'User created successfully', user: createdUser, token });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Compare the entered password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Generate a token for the logged-in user
        const token = generateToken(user);

        res.status(200).json({ message: 'Login successful', token, user });
    } catch (err) {
        console.error('Internal error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signUpUser, loginUser };
