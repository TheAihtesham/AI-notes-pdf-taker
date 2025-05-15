const User = require('../model/userModel');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const register = async (req, res) => {
  const { email, password, username } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      email,
      password: hashedPassword,
      username,
    });

    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      username: newUser.username,
      message: 'User registered successfully!',
    });
  } catch (err) {
    console.error('Error in register:', err.stack || err);
    res.status(500).json({ message: 'Server error.' });
  }
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      id: user._id,
      email: user.email,
      token,
    });
  } catch (err) {
    console.error('Error in login:', err.stack || err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
    login, 
    register
}
