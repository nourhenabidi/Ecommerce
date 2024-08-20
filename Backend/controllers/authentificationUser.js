const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secretKey = 'my_secret_key_2023$#@!';
const User =require('../models/Users')


function generateToken(user) {
    const expire = 60 * 60 * 48;//two day
    return jwt.sign({ user }, secretKey, { expiresIn: expire });
}

const signUpUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(email ,password)
    try {
        const hashedpasswordUser = await bcrypt.hash(password, 10);

        const newUser = {
            email,
            password: hashedpasswordUser,
        };
        await User.create(newUser);
        const token = generateToken({ user: newUser });

        res.status(201).json({ message: 'user created successfully',newUser, token });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
};
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
   console.log(user, 'user here' )
        if (user) {
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (isPasswordValid) {
                const token = generateToken({ user });
                return res.status(200).json({ message: 'Login successful', token,user });
            } else {
                return res.status(401).json({ error: 'Invalid password' });
            }
        } else {
            return res.status(404).json({ error: 'user not found' });
        }
    } catch (err) {
        console.error('Internal error during login:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { signUpUser, loginUser };