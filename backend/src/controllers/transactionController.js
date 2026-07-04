const {
  getAllTransactions,
  getCreditDebitTotals,
  getDaywiseTotalsLast7Days,
  addTransaction,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
  getTransactionTotalsAdmin,
  getDaywiseTotalsLast7DaysAdmin,
} = require('../models/transactionModel');

// GET /api/rest/all-transactions?type=debit|credit
const allTransactions = (req, res) => {
  const { type } = req.query;
  const transactions = getAllTransactions(req.user.id, type);
  res.json({ transactions });
};

// GET /api/rest/credit-debit-totals
const creditDebitTotals = (req, res) => {
  const totals = getCreditDebitTotals(req.user.id);
  res.json({ totals_credit_debit_transactions: totals });
};

// GET /api/rest/daywise-totals-7-days
const daywiseTotals7Days = (req, res) => {
  const totals = getDaywiseTotalsLast7Days(req.user.id);
  res.json({ last_7_days_transactions_credit_debit_totals: totals });
};

// POST /api/rest/add-transaction
const addTransactionHandler = (req, res) => {
  const { transaction_name, type, category, amount, date } = req.body || {};

  if (!transaction_name || !type || !category || amount === undefined || !date) {
    return res.status(400).json({
      message: 'transaction_name, type, category, amount and date are all required',
    });
  }

  if (!['debit', 'credit'].includes(type)) {
    return res.status(400).json({ message: "type must be 'debit' or 'credit'" });
  }

  const transaction = addTransaction({
    transaction_name,
    type,
    category,
    amount,
    date,
    user_id: req.user.id,
  });

  res.status(201).json({ insert_transactions_one: transaction });
};

// POST /api/rest/update-transaction
const updateTransactionHandler = (req, res) => {
  const { id, ...fields } = req.body || {};

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  const existing = getTransactionById(id);
  if (!existing || existing.user_id !== req.user.id) {
    return res.json({ update_transactions_by_pk: null });
  }

  const updated = updateTransaction(id, fields);
  res.json({ update_transactions_by_pk: updated });
};

// POST /api/rest/delete-transaction
const deleteTransactionHandler = (req, res) => {
  const { id } = req.body || {};

  if (!id) {
    return res.status(400).json({ message: 'id is required' });
  }

  const existing = getTransactionById(id);
  if (!existing || existing.user_id !== req.user.id) {
    return res.json({ delete_transactions_by_pk: null });
  }

  const deleted = deleteTransaction(id);
  res.json({ delete_transactions_by_pk: deleted });
};

// GET /api/rest/get-user-id
const getUserId = (req, res) => {
  res.json({ get_user_id: [{ id: req.user.id }] });
};

// GET /api/rest/transaction-totals-admin
const transactionTotalsAdmin = (req, res) => {
  const totals = getTransactionTotalsAdmin();
  res.json({ transaction_totals_admin: totals });
};

// GET /api/rest/daywise-totals-last-7-days-admin
const daywiseTotalsLast7DaysAdmin = (req, res) => {
  const totals = getDaywiseTotalsLast7DaysAdmin();
  res.json({ last_7_days_transactions_totals_admin: totals });
};

module.exports = {
  allTransactions,
  creditDebitTotals,
  daywiseTotals7Days,
  addTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getUserId,
  transactionTotalsAdmin,
  daywiseTotalsLast7DaysAdmin,
};