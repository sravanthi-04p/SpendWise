const { findUserById, updateUser } = require('../models/userModel');

// GET /api/rest/profile
const getProfile = (req, res) => {
  const user = findUserById(req.user.id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.json({ users: [user] });
};

// PUT /api/rest/profile
const updateProfile = (req, res) => {
  const { name, country, date_of_birth, city, permanent_address, postal_code, present_address } = req.body || {};

  const updatedUser = updateUser(req.user.id, {
    name,
    country,
    date_of_birth,
    city,
    permanent_address,
    postal_code,
    present_address,
  });

  res.json({ users: [updatedUser] });
};

module.exports = { getProfile, updateProfile };