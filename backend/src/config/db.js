const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, '../../spendwise.db'));

db.pragma('journal_mode = WAL');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'user',
    country TEXT,
    date_of_birth TEXT,
    city TEXT,
    permanent_address TEXT,
    postal_code TEXT,
    present_address TEXT
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS transactions (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    transaction_name TEXT NOT NULL,
    type TEXT NOT NULL CHECK(type IN ('debit', 'credit')),
    category TEXT NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`);

module.exports = db;