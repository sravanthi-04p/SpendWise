const db = require('../config/db');

const createUser = ({ name, email, hashedPassword }) => {
  const stmt = db.prepare(
    `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`
  );
  const result = stmt.run(name, email, hashedPassword);
  return result.lastInsertRowid; // the new user's id
};

const findUserByEmail = (email) => {
  const stmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  return stmt.get(email); // returns undefined if not found
};

const findUserById = (id) => {
  const stmt = db.prepare(
    `SELECT id, name, email, role, country, date_of_birth, city, permanent_address, postal_code, present_address
     FROM users WHERE id = ?`
  );
  return stmt.get(id);
};
const updateUser = (id, fields) => {
  const allowedFields = [
    'name',
    'country',
    'date_of_birth',
    'city',
    'permanent_address',
    'postal_code',
    'present_address',
  ];

  const updates = [];
  const values = [];

  allowedFields.forEach((field) => {
    if (fields[field] !== undefined) {
      updates.push(`${field} = ?`);
      values.push(fields[field]);
    }
  });

  if (updates.length === 0) return findUserById(id);

  values.push(id);

  const stmt = db.prepare(`UPDATE users SET ${updates.join(', ')} WHERE id = ?`);
  stmt.run(...values);

  return findUserById(id);
};

module.exports = { createUser, findUserByEmail, findUserById, updateUser };