const db = require('../config/db');

// Get all transactions for one user, optionally filtered by type
const getAllTransactions = (userId, type) => {
  if (type) {
    const stmt = db.prepare(
      `SELECT * FROM transactions WHERE user_id = ? AND type = ? ORDER BY date DESC`
    );
    return stmt.all(userId, type);
  }
  const stmt = db.prepare(
    `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`
  );
  return stmt.all(userId);
};

// Get credit/debit totals for one user
const getCreditDebitTotals = (userId) => {
  const stmt = db.prepare(
    `SELECT type, SUM(amount) as sum FROM transactions WHERE user_id = ? GROUP BY type`
  );
  return stmt.all(userId);
};

// Get last 7 days totals, grouped by day and type
const getDaywiseTotalsLast7Days = (userId) => {
  const stmt = db.prepare(`
    SELECT date(date) as day, type, SUM(amount) as sum
    FROM transactions
    WHERE user_id = ? AND date >= date('now', '-7 days')
    GROUP BY day, type
    ORDER BY day ASC
  `);
  return stmt.all(userId);
};

// Insert a new transaction
const addTransaction = ({ transaction_name, type, category, amount, date, user_id }) => {
  const stmt = db.prepare(`
    INSERT INTO transactions (transaction_name, type, category, amount, date, user_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  const result = stmt.run(transaction_name, type, category, amount, date, user_id);
  return getTransactionById(result.lastInsertRowid);
};

// Get one transaction by id (used internally, and to verify ownership)
const getTransactionById = (id) => {
  const stmt = db.prepare(`SELECT * FROM transactions WHERE id = ?`);
  return stmt.get(id);
};

// Update a transaction (only fields provided are changed)
const updateTransaction = (id, fields) => {
  const existing = getTransactionById(id);
  if (!existing) return null;

  const updated = { ...existing, ...fields };

  const stmt = db.prepare(`
    UPDATE transactions
    SET transaction_name = ?, type = ?, category = ?, amount = ?, date = ?
    WHERE id = ?
  `);
  stmt.run(updated.transaction_name, updated.type, updated.category, updated.amount, updated.date, id);

  return getTransactionById(id);
};

// Delete a transaction
const deleteTransaction = (id) => {
  const existing = getTransactionById(id);
  if (!existing) return null;

  const stmt = db.prepare(`DELETE FROM transactions WHERE id = ?`);
  stmt.run(id);

  return existing; // return what was deleted
};

// ADMIN: totals across ALL users
const getTransactionTotalsAdmin = () => {
  const stmt = db.prepare(
    `SELECT type, SUM(amount) as sum FROM transactions GROUP BY type`
  );
  return stmt.all();
};

// ADMIN: last 7 days totals across ALL users
const getDaywiseTotalsLast7DaysAdmin = () => {
  const stmt = db.prepare(`
    SELECT date(date) as day, type, SUM(amount) as sum
    FROM transactions
    WHERE date >= date('now', '-7 days')
    GROUP BY day, type
    ORDER BY day ASC
  `);
  return stmt.all();
};

module.exports = {
  getAllTransactions,
  getCreditDebitTotals,
  getDaywiseTotalsLast7Days,
  addTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionTotalsAdmin,
  getDaywiseTotalsLast7DaysAdmin,
};