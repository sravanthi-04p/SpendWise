import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import api from '../api/axios';

const CATEGORIES = ['Shopping', 'Service', 'Transfer', 'Entertainment', 'Food', 'Bills'];

const TransactionModal = ({ isOpen, onClose, onSuccess, editingTransaction }) => {
  const [form, setForm] = useState({
    transaction_name: '',
    type: '',
    category: '',
    amount: '',
    date: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingTransaction) {
      setForm({
        transaction_name: editingTransaction.transaction_name,
        type: editingTransaction.type,
        category: editingTransaction.category,
        amount: editingTransaction.amount,
        date: editingTransaction.date,
      });
    } else {
      setForm({ transaction_name: '', type: '', category: '', amount: '', date: '' });
    }
    setError('');
  }, [editingTransaction, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.transaction_name || !form.type || !form.category || !form.amount || !form.date) {
      setError('All fields are required');
      return;
    }

    setLoading(true);
    try {
      if (editingTransaction) {
        await api.post('/rest/update-transaction', {
          id: editingTransaction.id,
          ...form,
          amount: Number(form.amount),
        });
      } else {
        await api.post('/rest/add-transaction', { ...form, amount: Number(form.amount) });
      }
      onSuccess();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const labelStyle = { display: 'block', fontSize: '13px', fontWeight: 500, margin: '0 0 6px' };
  const inputStyle = { width: '100%', padding: '11px 14px', marginBottom: '16px' };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(20,30,60,0.4)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
      }}
    >
      <div className="card" style={{ padding: '28px', width: '420px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <h3 style={{ margin: '0 0 4px' }}>{editingTransaction ? 'Update Transaction' : 'Add Transaction'}</h3>
            <p style={{ color: 'var(--color-text-muted)', fontSize: '13px', margin: 0 }}>
              {editingTransaction ? 'You can update your transaction here' : 'Fill in the details below'}
            </p>
          </div>
          <button className="icon-btn" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {error && <p style={{ color: 'var(--color-debit)', fontSize: '13px' }}>{error}</p>}

        <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
          <label style={labelStyle}>Transaction Name</label>
          <input
            name="transaction_name"
            value={form.transaction_name}
            onChange={handleChange}
            placeholder="Enter Name"
            style={inputStyle}
          />

          <label style={labelStyle}>Transaction Type</label>
          <select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
            <option value="">Select Transaction Type</option>
            <option value="debit">Debit</option>
            <option value="credit">Credit</option>
          </select>

          <label style={labelStyle}>Category</label>
          <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
            <option value="">Select</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <label style={labelStyle}>Amount</label>
          <input
            name="amount"
            type="number"
            value={form.amount}
            onChange={handleChange}
            placeholder="Enter Your Amount"
            style={inputStyle}
          />

          <label style={labelStyle}>Date</label>
          <input name="date" type="date" value={form.date} onChange={handleChange} style={inputStyle} />

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Saving...' : editingTransaction ? 'Update Transaction' : 'Add Transaction'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;