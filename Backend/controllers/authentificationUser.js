const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'my_secret_key_2023$#@!';
const User =require('../models/Users')


function generateToken(user) {
    const expire = 60 * 60 * 48; // Two days
    return jwt.sign({ user: { id: user.id, email: user.email, role: user.role } }, secretKey, { expiresIn: expire });
}


const signUpUser = async (req, res) => {
    const { email, password, role = 'client' } = req.body; // Default to 'client' if not provided
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedPassword,
            role, // Include role
        };
        await User.create(newUser);
        const token = generateToken({ user: newUser });

        res.status(201).json({ message: 'User created successfully', newUser, token });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = generateToken(user); // Pass the user object directly
                return res.status(200).json({ message: 'Login successful', token, user });
            } else {
                return res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ error: 'User not found' });
        }
    } catch (err) {
        console.error('Internal error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = { signUpUser, loginUser };