const express = require('express');
const {
  allTransactions,
  creditDebitTotals,
  daywiseTotals7Days,
  addTransactionHandler,
  updateTransactionHandler,
  deleteTransactionHandler,
  getUserId,
  transactionTotalsAdmin,
  daywiseTotalsLast7DaysAdmin,
} = require('../controllers/transactionController');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

router.get('/all-transactions', protect, allTransactions);
router.get('/credit-debit-totals', protect, creditDebitTotals);
router.get('/daywise-totals-7-days', protect, daywiseTotals7Days);
router.post('/add-transaction', protect, addTransactionHandler);
router.post('/update-transaction', protect, updateTransactionHandler);
router.post('/delete-transaction', protect, deleteTransactionHandler);
router.get('/get-user-id', protect, getUserId);

router.get('/transaction-totals-admin', protect, adminOnly, transactionTotalsAdmin);
router.get('/daywise-totals-last-7-days-admin', protect, adminOnly, daywiseTotalsLast7DaysAdmin);

module.exports = router;