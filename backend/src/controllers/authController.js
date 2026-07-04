const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const { createUser, findUserByEmail } = require('../models/userModel');

// POST /api/auth/register
const register = async (req, res) => {
  try {
    const body = req.body || {};
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Name, email and password are required' });
    }

    const existingUser = findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ message: 'A user with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = createUser({ name, email, hashedPassword });

    const token = generateToken(userId, 'user');

    res.status(201).json({
      id: userId,
      name,
      email,
      role: 'user',
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong during registration' });
  }
};

// POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const user = findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user.id, user.role);

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Something went wrong during login' });
  }
};

module.exports = { register, login };