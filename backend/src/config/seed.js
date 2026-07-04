const bcrypt = require('bcryptjs');
const db = require('./db');
const { findUserByEmail, createUser } = require('../models/userModel');
const { addTransaction } = require('../models/transactionModel');

const DEMO_EMAIL = 'test@example.com';
const DEMO_PASSWORD = 'password123';

const daysAgo = (n) => {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d.toISOString().split('T')[0]; // YYYY-MM-DD
};

const seedDemoData = async () => {
  const existing = findUserByEmail(DEMO_EMAIL);
  if (existing) {
    console.log('Demo account already exists, skipping seed.');
    return;
  }

  console.log('Seeding demo account and sample transactions...');

  const hashedPassword = await bcrypt.hash(DEMO_PASSWORD, 10);
  const userId = createUser({ name: 'Test User', email: DEMO_EMAIL, hashedPassword });

  // Promote to admin
  db.prepare(`UPDATE users SET role = 'admin' WHERE id = ?`).run(userId);

  // Also fill in a few profile fields so the Profile page looks complete
  db.prepare(
    `UPDATE users SET city = ?, country = ?, postal_code = ?, present_address = ? WHERE id = ?`
  ).run('San Jose', 'USA', '45962', 'San Jose, California, USA', userId);

  const sampleTransactions = [
    { name: 'Salary', type: 'credit', category: 'Transfer', amount: 5000, daysBack: 1 },
    { name: 'Freelance Payment', type: 'credit', category: 'Transfer', amount: 1200, daysBack: 4 },
    { name: 'Grocery Store', type: 'debit', category: 'Shopping', amount: 220, daysBack: 2 },
    { name: 'Netflix Subscription', type: 'debit', category: 'Entertainment', amount: 45, daysBack: 3 },
    { name: 'Electricity Bill', type: 'debit', category: 'Bills', amount: 180, daysBack: 5 },
    { name: 'Coffee Shop', type: 'debit', category: 'Food', amount: 35, daysBack: 0 },
    { name: 'Spotify Subscription', type: 'debit', category: 'Entertainment', amount: 15, daysBack: 6 },
  ];

  sampleTransactions.forEach((tx) => {
    addTransaction({
      transaction_name: tx.name,
      type: tx.type,
      category: tx.category,
      amount: tx.amount,
      date: daysAgo(tx.daysBack),
      user_id: userId,
    });
  });

  console.log(`Demo account seeded: ${DEMO_EMAIL} / ${DEMO_PASSWORD}`);
};

module.exports = seedDemoData;